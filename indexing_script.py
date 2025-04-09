import json
import os
import time
from supabase import create_client, Client
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import logging

# --- Logging Configuration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - [%(funcName)s] - %(message)s')

# --- Load Environment Variables ---
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

# --- Configuration ---
INPUT_JSON_PATH = "/Users/aniketnikam/Documents/Personal_project/Capre_capital/shl_product_catalog_processed.json" # Make sure this is correct
EMBEDDING_MODEL_NAME = 'all-MiniLM-L6-v2'
EXPECTED_EMBEDDING_DIMENSION = 384
TABLE_NAME = "products"
UPSERT_BATCH_SIZE = 100 # Increased slightly, monitor performance
MAX_RETRIES = 3
RETRY_DELAY = 5

# --- Helper Functions ---
def get_embedding_text(product):
    """Combines important fields for richer embedding context. Handles empty/missing values."""
    # Helper to safely join list items that are non-empty strings
    def join_list(items):
        if not items: return ''
        # Filter out None, empty strings, and ensure item is a string before stripping/joining
        return ', '.join([str(item).strip() for item in items if item and isinstance(item, str) and item.strip()])

    parts = [
        f"Product: {product.get('product_name', '')}",
        f"Type: {join_list(product.get('product_type'))}",
        f"Solution Type: {product.get('solution_type', '')}", # Added solution_type
        f"Description: {product.get('description', '')}",
        f"Measures: {join_list(product.get('measured_constructs'))}",
        f"Roles: {join_list(product.get('job_roles'))}", # Will skip the "" correctly
        f"Target Audience: {join_list(product.get('target_audience'))}"
    ]
    # Filter out parts that are completely empty after formatting (e.g., "Type: ")
    return " | ".join(part for part in parts if part and ': ' not in part or ': ' in part and len(part.split(': ', 1)) > 1 and part.split(': ', 1)[1])


def upsert_batch_with_retry(supabase_client: Client, data: list):
    """Attempts to upsert data to Supabase with retries."""
    if not data: return True
    for attempt in range(MAX_RETRIES):
        try:
            logging.info(f"Upserting batch of {len(data)} records (Attempt {attempt + 1}/{MAX_RETRIES})...")
            response = supabase_client.table(TABLE_NAME).upsert(data, on_conflict='product_id').execute()
            # Add detailed error check if possible based on client version
            # if hasattr(response, 'error') and response.error: raise Exception(f"Supabase API Error: {response.error.message}")
            logging.info(f"Successfully upserted batch.")
            return True
        except Exception as e:
            logging.error(f"Supabase upsert error (Attempt {attempt + 1}/{MAX_RETRIES}): {e}", exc_info=False) # exc_info=False to avoid full traceback on retryable errors
            if attempt < MAX_RETRIES - 1:
                logging.info(f"Retrying in {RETRY_DELAY} seconds...")
                time.sleep(RETRY_DELAY)
            else:
                logging.error("Max retries reached for upserting batch.", exc_info=True) # Log full traceback on final failure
                return False

# --- Main Indexing Logic ---
def main():
    logging.info("Starting updated indexing process...")

    # --- Environment Variable Check ---
    if not SUPABASE_URL or not SUPABASE_KEY:
        logging.error("Critical Error: Supabase URL or Key not found. Check .env file.")
        return

    # --- Initialize Clients (Moved out of try block for clarity, checked later) ---
    supabase: Client | None = None
    model: SentenceTransformer | None = None
    try:
        logging.info("Initializing Supabase client...")
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        logging.info("Supabase client initialized.")
        logging.info(f"Loading embedding model '{EMBEDDING_MODEL_NAME}'...")
        model = SentenceTransformer(EMBEDDING_MODEL_NAME)
        actual_dimension = model.get_sentence_embedding_dimension()
        logging.info(f"Model loaded. Actual embedding dimension: {actual_dimension}")
        if actual_dimension != EXPECTED_EMBEDDING_DIMENSION:
            raise ValueError(f"Model dimension ({actual_dimension}) != expected ({EXPECTED_EMBEDDING_DIMENSION}) for SQL table!")
    except Exception as e:
        logging.error(f"Critical Error during initialization: {e}", exc_info=True)
        return # Stop if essential clients fail

    # --- Load and De-duplicate Product Data ---
    products_from_file = []
    try:
        logging.info(f"Loading product data from '{INPUT_JSON_PATH}'...")
        with open(INPUT_JSON_PATH, 'r', encoding='utf-8') as f:
            products_from_file = json.load(f)
        logging.info(f"Loaded {len(products_from_file)} records from file.")
        if not isinstance(products_from_file, list):
             logging.error(f"Error: Input file does not contain a valid JSON list.")
             return
    except FileNotFoundError:
        logging.error(f"Critical Error: Input file not found at '{INPUT_JSON_PATH}'")
        return
    except json.JSONDecodeError as e:
        logging.error(f"Critical Error: Failed to decode JSON: {e}")
        return
    except Exception as e:
        logging.error(f"Critical Error reading input file: {e}", exc_info=True)
        return

    # --- De-duplication Step ---
    unique_products_dict = {}
    duplicates_found_count = 0
    skipped_missing_id_count = 0
    valid_input_count = 0

    for product in products_from_file:
        product_id = product.get('product_id')
        # Ensure product_id exists and is not just whitespace
        if not product_id or not str(product_id).strip():
            logging.warning(f"Skipping record due to missing or empty 'product_id': {product.get('product_name', 'N/A')}")
            skipped_missing_id_count += 1
            continue

        product_id_str = str(product_id).strip() # Use stripped string ID as key
        valid_input_count += 1

        if product_id_str not in unique_products_dict:
            unique_products_dict[product_id_str] = product # Store first occurrence
        else:
            duplicates_found_count += 1
            logging.warning(f"Duplicate product_id found and skipped: '{product_id_str}'")

    unique_product_list = list(unique_products_dict.values())
    total_unique_products = len(unique_product_list)

    logging.info(f"--- Data Loading Summary ---")
    logging.info(f"Total records read from file: {len(products_from_file)}")
    logging.info(f"Records skipped due to missing/empty product_id: {skipped_missing_id_count}")
    logging.info(f"Duplicate product_ids found and skipped: {duplicates_found_count}")
    logging.info(f"Total unique products to process: {total_unique_products}")
    #-----------------------------

    if not unique_product_list:
        logging.warning("No unique products found to process. Exiting.")
        return

    # --- Generate Embeddings and Upsert UNIQUE Products ---
    logging.info(f"Generating embeddings and upserting {total_unique_products} unique products...")
    data_to_upsert = []
    processed_count = 0
    batch_error_occurred = False # Flag to stop processing if a batch fails

    # Now iterate over the unique list
    for i, product in enumerate(unique_product_list):
        # Get the validated product_id used as the dictionary key
        product_id = str(product.get('product_id')).strip()

        try:
            # Prepare text and generate embedding
            text_to_embed = get_embedding_text(product)
            if not text_to_embed or text_to_embed.isspace():
                 # This check might be redundant if get_embedding_text handles it, but safe
                 logging.warning(f"Skipping unique product {i+1}/{total_unique_products} (ID: {product_id}) due to empty text for embedding.")
                 # Consider if skipping here is correct, or if you want to insert without embedding?
                 # For now, we skip embedding/upserting if text is empty.
                 continue

            embedding = model.encode(text_to_embed).tolist()

            # Prepare record for Supabase
            # Use .get with defaults for all potentially missing fields
            product_record = {
                'product_id': product_id,
                'product_name': product.get('product_name'),
                'url': product.get('url'),
                'remote_testing': product.get('remote_testing'),
                'adaptive_irt': product.get('adaptive_irt'),
                'product_type': product.get('product_type', []) or [], # Ensure always a list, even if null in JSON
                'description': product.get('description'),
                'target_audience': product.get('target_audience', []) or [],
                'measured_constructs': product.get('measured_constructs', []) or [],
                'job_roles': product.get('job_roles', []) or [],
                'industry': product.get('industry', []) or [],
                'features': product.get('features', []) or [],
                'duration_minutes': product.get('duration_minutes'), # Handles None correctly
                'embedding': embedding,
                # 'solution_type': product.get('solution_type') # Add if column exists in DB
            }
            # Filter out keys where value is None IF Supabase requires it (usually NULL is fine)
            # product_record = {k: v for k, v in product_record.items() if v is not None} # Optional

            data_to_upsert.append(product_record)
            processed_count += 1

            # Upsert in batches
            if len(data_to_upsert) >= UPSERT_BATCH_SIZE or (i == total_unique_products - 1): # Also upsert last batch
                if not upsert_batch_with_retry(supabase, data_to_upsert):
                    batch_error_occurred = True
                    logging.error("Stopping processing due to batch upsert failure.")
                    break # Stop processing loop if a batch fails permanently
                data_to_upsert = [] # Clear the batch
                logging.info(f"Progress: {processed_count}/{total_unique_products} unique products prepared/upserted.")

        except Exception as e:
            logging.error(f"Error processing unique product {i+1}/{total_unique_products} (ID: {product_id}): {e}", exc_info=True)
            # Decide whether to skip this single record or stop entirely
            # For now, we log and continue to the next product
            continue

    logging.info(f"--- Indexing Summary ---")
    logging.info(f"Total unique products processed for upsert: {processed_count}")
    if batch_error_occurred:
         logging.warning("Process stopped prematurely due to batch upsert errors.")
    logging.info("Indexing process finished.")

if __name__ == "__main__":
    main()