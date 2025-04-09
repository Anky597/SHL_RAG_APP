import os
import time
import json
import logging
from flask import Flask, request, jsonify
from supabase import create_client, Client
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
from dotenv import load_dotenv

# --- Logging Configuration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - [%(funcName)s] - %(message)s')

# --- Load Environment Variables ---
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# --- Configuration ---
EMBEDDING_MODEL_NAME = 'all-MiniLM-L6-v2'
EXPECTED_EMBEDDING_DIMENSION = 384
# *** NEW: Separate Retrieval and Final Counts ***
DB_RETRIEVAL_COUNT = 6      # Fetch top 6 candidates from Supabase
MAX_FINAL_RECOMMENDATIONS = 3 # Ask LLM to return at most 3
# *** END NEW ***
DB_MATCH_THRESHOLD = 0.4 # Keep threshold relatively inclusive for retrieval
DB_FUNCTION_NAME = "match_products"
MAX_QUERY_RETRIES = 2
RETRY_QUERY_DELAY = 3
GEMINI_QUERY_EXPANSION_TEMP = 0.6
GEMINI_JSON_GENERATION_TEMP = 0.1 # Keep low for structured JSON

# --- Initialize Clients (Global Scope) ---
supabase_client = None
embed_model = None
gen_model = None
initialization_error_message = None
try:
    logging.info("Initializing Supabase client...")
    if not SUPABASE_URL or not SUPABASE_KEY: raise ValueError("Supabase URL/Key missing")
    supabase_client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    logging.info("Supabase client initialized.")
    logging.info(f"Loading embedding model '{EMBEDDING_MODEL_NAME}'...")
    embed_model = SentenceTransformer(EMBEDDING_MODEL_NAME)
    actual_dimension = embed_model.get_sentence_embedding_dimension()
    if actual_dimension != EXPECTED_EMBEDDING_DIMENSION: raise ValueError(f"Model dim mismatch! Expected {EXPECTED_EMBEDDING_DIMENSION}, got {actual_dimension}.")
    logging.info(f"Embedding model loaded.")
    logging.info("Initializing Gemini client...")
    if not GEMINI_API_KEY: raise ValueError("Gemini API Key missing")
    genai.configure(api_key=GEMINI_API_KEY)
    # Ensure you use a model name available to you via the API key
    gen_model = genai.GenerativeModel('gemini-1.5-flash') # Or gemini-pro, etc.
    logging.info("Gemini client initialized.")
except Exception as e:
    logging.critical(f"CRITICAL ERROR DURING INITIALIZATION: {e}", exc_info=True)
    initialization_error_message = f"Server initialization failed: {e}"


# --- Flask App Definition ---
app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['JSON_SORT_KEYS'] = False  # Preserve the order of keys in the JSON response
app.config['JSONIFY_MIMETYPE'] = 'application/json; charset=utf-8'  # Ensure proper content type

# --- Helper Function for Embedding Text (Keep as before) ---
def get_embedding_text(product):
    """Combines important fields for richer embedding context."""
    parts = [
        f"Product: {product.get('product_name', '')}",
        f"Type: {', '.join(product.get('product_type', [])) if product.get('product_type') else ''}",
        f"Solution Type: {product.get('solution_type', '')}", # Include solution_type if present
        f"Description: {product.get('description', '')}",
        f"Measures: {', '.join(product.get('measured_constructs', [])) if product.get('measured_constructs') else ''}",
        f"Roles: {', '.join(str(item).strip() for item in product.get('job_roles', []) if item and isinstance(item, str) and item.strip())}", # Clean job roles list
        f"Target Audience: {', '.join(str(item).strip() for item in product.get('target_audience', []) if item and isinstance(item, str) and item.strip())}" # Clean audience list
    ]
    return " | ".join(part for part in parts if part and ': ' not in part or ': ' in part and len(part.split(': ', 1)) > 1 and part.split(': ', 1)[1])


# --- Query Expansion Function (Keep as before) ---
def expand_query_with_llm(original_query: str) -> str:
    """Uses Gemini to expand the user query with related terms for better retrieval."""
    if not gen_model:
        logging.error("Gemini client not available for query expansion.")
        return original_query
    prompt = f"""Analyze the following user query about SHL assessments. Identify the core concepts, skills, or job roles mentioned. Generate a list of related keywords or synonyms that would be useful for searching a database of assessment product descriptions. Output ONLY the keywords, separated by commas. User Query: "{original_query}" Keywords only, comma-separated:""" # Simplified prompt slightly
    try:
        logging.info(f"Expanding query: '{original_query}'")
        response = gen_model.generate_content(prompt, generation_config=genai.types.GenerationConfig(temperature=GEMINI_QUERY_EXPANSION_TEMP))
        if response.parts:
            expanded_terms = response.text.strip(); combined_query = f"{original_query} | Relevant concepts: {expanded_terms}"
            logging.info(f"Expanded query for search: '{combined_query}'"); return combined_query
        else: logging.warning(f"Query expansion failed. Reason: Response blocked or empty. Falling back."); return original_query
    except Exception as e: logging.error(f"Error during query expansion API call: {e}", exc_info=True); return original_query


# --- RAG Core Function (Updated) ---
def get_product_recommendation_backend_robust(original_query: str):
    """Performs the enhanced RAG process: Expand -> Retrieve 6 -> Select Max 3 -> Generate JSON."""
    if initialization_error_message: return {"error": f"Server not initialized: {initialization_error_message}"}, 503
    if not original_query or original_query.isspace(): return {"error": "Query parameter is missing or empty."}, 400

    default_error_response = {"error": "An internal error occurred."}; default_error_code = 500
    # Consistent no-match structure
    no_match_json_response_dict = {"status": "no_match","message": f"No specific products closely matched the query: '{original_query}'. Try rephrasing.","recommended_assessments": []}

    try:
        # 1. Expand Query
        expanded_query = expand_query_with_llm(original_query)

        # 2. Embed Expanded Query
        logging.info(f"Embedding expanded query for retrieval..."); query_embedding = embed_model.encode(expanded_query).tolist()

        # 3. Query Supabase using Expanded Query Embedding (Retrieve top N candidates)
        logging.info(f"Searching for top {DB_RETRIEVAL_COUNT} relevant products...")
        matches = []; last_db_error = None
        for attempt in range(MAX_QUERY_RETRIES):
             try:
                  response = supabase_client.rpc(
                      DB_FUNCTION_NAME,
                      {'query_embedding': query_embedding,
                       'match_threshold': DB_MATCH_THRESHOLD,
                       # *** Use DB_RETRIEVAL_COUNT here ***
                       'match_count': DB_RETRIEVAL_COUNT}
                  ).execute()
                  if hasattr(response, 'data'): matches = response.data
                  else: matches = response
                  logging.info(f"Initial retrieval found {len(matches)} candidates."); last_db_error = None; break
             except Exception as e:
                  last_db_error = e; logging.error(f"Supabase RPC error (Attempt {attempt + 1}/{MAX_QUERY_RETRIES}): {e}", exc_info=True)
                  if attempt < MAX_QUERY_RETRIES - 1: time.sleep(RETRY_QUERY_DELAY)
                  else: return {"error": f"Database search failed after retries: {e}"}, 503
        if last_db_error: return {"error": f"Database search failed: {last_db_error}"}, 503

        if not matches:
             logging.warning(f"No candidates found matching threshold {DB_MATCH_THRESHOLD} for expanded query.")
             # Return the structured no-match response as JSON string, status 200
             return json.dumps(no_match_json_response_dict), 200

        # 4. Format Context for Final LLM (Using up to DB_RETRIEVAL_COUNT matches)
        logging.info(f"Preparing context with {len(matches)} candidates for AI selection...")
        context_data_for_llm = []
        for match in matches:
              if isinstance(match, dict): context_data_for_llm.append({ "url": match.get('url'),"adaptive_irt": match.get('adaptive_irt'), "description": match.get('description'), "duration_minutes": match.get('duration_minutes'), "remote_testing": match.get('remote_testing'), "product_type": match.get('product_type', []), "product_name": match.get('product_name'),"similarity": match.get('similarity') })
              else: logging.warning(f"Skipping unexpected match item format: {type(match)}")

        # 5. Construct **Refined** Prompt for Final JSON Generation
        context_json_string = json.dumps(context_data_for_llm, indent=2)

        # *** UPDATED PROMPT ***
        prompt = f"""You are an AI assistant generating JSON recommendations for SHL assessments.
        Analyze the user's original query and the provided context, which contains the top {len(context_data_for_llm)} potentially relevant products found in the database based on an expanded search.

        Original User Query: "{original_query}"

        Product Data Context (Top {len(context_data_for_llm)} candidates retrieved, sorted by relevance):
        ```json
        {context_json_string}
        ```

        Your Task:
        1. Select the **BEST** and **MOST RELEVANT** products from the context that directly address the *original user query*.
        2. Choose **AT MOST {MAX_FINAL_RECOMMENDATIONS}** products. Prioritize relevance to the original query.
        3. If the original query was broad (e.g., 'technical skills'), include products from the context that clearly fit that category (like coding tests, specific engineering tests, maybe tech JFA), up to the limit of {MAX_FINAL_RECOMMENDATIONS}.
        4. Generate ONLY a valid JSON object containing the details of your selected product(s). No extra text before or after.

        JSON Output Instructions:
        - Top-level key: "recommended_assessments" (JSON array).
        - The array should contain **0 to {MAX_FINAL_RECOMMENDATIONS}** product objects.
        - Each product object MUST have these keys/types IN THIS EXACT ORDER:
          - "product_id": string (from the context data)
          - "product_name": string (from the context data)
          - "url": string (non-null)
          - "adaptive_support": string ("Yes" or "No" from 'adaptive_irt')
          - "description": string
          - "duration": number or null (from 'duration_minutes')
          - "remote_support": string ("Yes" or "No" from 'remote_testing')
          - "test_type": array of strings (from 'product_type')
        - Use ONLY data from the context. Convert booleans accurately. Handle nulls.
        - If *no products* in the provided context are a good match for the *original query*, output exactly: `{{"status": "no_relevant_match_in_context", "message": "While related products were retrieved, none closely matched the specific request.", "recommended_assessments": []}}`

        Generate the JSON output now.
        """

        # 6. Call Gemini for Final JSON Generation
        logging.info(f"Sending final generation prompt to Gemini (asking for max {MAX_FINAL_RECOMMENDATIONS} results)...")
        try:
            gemini_response = gen_model.generate_content(prompt, generation_config=genai.types.GenerationConfig(temperature=GEMINI_JSON_GENERATION_TEMP))
            logging.debug(f"Raw Gemini Response Text: {gemini_response.text}")

            if gemini_response.parts:
                 # (Keep JSON cleaning and validation logic as before)
                 recommendation_json_string = gemini_response.text; logging.info("Received JSON response from Gemini.")
                 cleaned_json_string = recommendation_json_string.strip()
                 if cleaned_json_string.startswith("```json"): cleaned_json_string = cleaned_json_string[7:]
                 if cleaned_json_string.startswith("```"): cleaned_json_string = cleaned_json_string[3:]
                 if cleaned_json_string.endswith("```"): cleaned_json_string = cleaned_json_string[:-3]
                 cleaned_json_string = cleaned_json_string.strip()
                 try:
                      parsed_json = json.loads(cleaned_json_string); logging.info("Response validated as JSON.")
                      # Add status if not present by LLM
                      if "status" not in parsed_json:
                           if isinstance(parsed_json.get("recommended_assessments"), list) and len(parsed_json.get("recommended_assessments")) > 0 :
                                parsed_json["status"] = "success"
                           else: # Handle cases where LLM returns [] without the specific no-match structure
                                parsed_json["status"] = "no_relevant_match_in_context"
                                parsed_json["message"] = "No relevant products selected by AI from the provided context."
                                if "recommended_assessments" not in parsed_json: parsed_json["recommended_assessments"] = []
                           cleaned_json_string = json.dumps(parsed_json) # Re-encode if status was added
                      return cleaned_json_string, 200
                 except json.JSONDecodeError as json_e: logging.error(f"Gemini did not return valid JSON after cleaning: {json_e}. Raw: {recommendation_json_string}"); return {"error": "AI model did not return valid JSON format."}, 502
            elif gemini_response.prompt_feedback.block_reason: logging.warning(f"Gemini response blocked. Reason: {gemini_response.prompt_feedback.block_reason}"); return {"error": f"AI response blocked ({gemini_response.prompt_feedback.block_reason}). Try rephrasing."}, 400
            else: logging.warning("Gemini returned an empty response."); return {"error": "AI model returned an empty response."}, 502
        except Exception as e: logging.error(f"Error calling Gemini API: {e}", exc_info=True); return {"error": f"An error occurred calling the AI model: {e}"}, 502
    except Exception as e: logging.error(f"Unexpected error in RAG process: {e}", exc_info=True); return default_error_response, default_error_code

# --- Flask Routes (Unchanged) ---
# (Definitions of /recommend and /health routes remain exactly as before)
@app.route('/recommend', methods=['POST'])
def recommend_assessments():
    if initialization_error_message: return jsonify({"error": initialization_error_message, "status": "unavailable"}), 503
    start_time = time.time(); logging.info("Received request on /recommend endpoint.")
    data = request.json
    if not data or 'query' not in data: logging.warning("Request missing query parameter."); return jsonify({"error": "Missing 'query' in JSON request body.", "status": "bad_request"}), 400
    original_query = data['query']; logging.info(f"Processing original query: '{original_query[:100]}...'")
    result, status_code = get_product_recommendation_backend_robust(original_query)
    end_time = time.time(); processing_time = end_time - start_time
    logging.info(f"Request processed in {processing_time:.2f} seconds. Status code: {status_code}")
    if isinstance(result, str): # Success case returns JSON string
        try: 
            response_data = json.loads(result)
            # Set response headers for pretty printing when returning the response
            response = jsonify(response_data)
            response.headers['Content-Type'] = 'application/json; charset=utf-8'
            return response, status_code
        except json.JSONDecodeError: logging.error(f"Internal error: RAG function returned non-JSON string on success: {result}"); return jsonify({"error": "Internal processing error: Invalid format received.", "status": "internal_error"}), 500
    elif isinstance(result, dict): # Error cases return dict
        if 'status' not in result: result['status'] = 'error'
        return jsonify(result), status_code
    else: logging.error(f"Unexpected result type from RAG function: {type(result)}"); return jsonify({"error": "An unexpected internal error occurred.", "status": "internal_error"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    if initialization_error_message: return jsonify({"status": "unhealthy", "reason": initialization_error_message}), 503
    if supabase_client and embed_model and gen_model: return jsonify({"status": "healthy"}), 200
    else: return jsonify({"status": "unhealthy", "reason": "One or more components failed to initialize"}), 503

# --- Run Flask App ---
if __name__ == '__main__':
    # Read PORT environment variable, default to 8000 if not set
    # Hugging Face Spaces often injects PORT=7860, but we can use others like 8000
    port = int(os.environ.get("PORT", 8000))
    # Run with debug=False for deployment simulation
    # Bind to 0.0.0.0 to be accessible within the container network
    app.run(debug=False, host='0.0.0.0', port=port)