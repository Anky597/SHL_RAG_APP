# app/main.py (Gradio Version - Asynchronous API & CLI SUPPORT)

import logging
import os
import sys
import gradio as gr
import asyncio

# Import the function that gets the chain and handles initialization implicitly
from app.rag_component import get_rag_chain, GOOGLE_API_KEY

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(name)s: %(message)s')
log = logging.getLogger(__name__)

# --- Application Initialization & State ---
rag_chain_instance = None
initialization_error = None
log.info("Gradio app module loaded. Attempting RAG component initialization...")
try:
    if not GOOGLE_API_KEY:
        raise ValueError("GOOGLE_API_KEY environment variable not set or empty.")
    rag_chain_instance = get_rag_chain()
    log.info("RAG components initialization attempt finished successfully.")
except Exception as e:
    log.exception("FATAL ERROR during application startup initialization.")
    initialization_error = f"Initialization Failed: {type(e).__name__} - Check server logs."

# --- Define the Core Processing Function ---
async def get_recommendation(user_question: str) -> str:
    """Takes user question and returns RAG recommendation or error message asynchronously."""
    log.info(f"Processing request via Gradio async function for: '{user_question[:100]}...'")
    if initialization_error:
        log.error(f"Returning error due to initialization failure: {initialization_error}")
        return f"Error: Service Initialization Failed - Check application logs. ({initialization_error})"
    if not rag_chain_instance:
        log.error("RAG chain instance is not available.")
        return "Error: Service is not ready. Please try again later or check logs."
    if not user_question or not isinstance(user_question, str) or not user_question.strip():
        log.warning("Received empty or invalid question.")
        return "Error: Please enter a question."
    try:
        # If rag_chain_instance.invoke is a blocking (synchronous) call,
        # we run it in a thread executor to avoid blocking the event loop.
        loop = asyncio.get_running_loop()
        result = await loop.run_in_executor(None, rag_chain_instance.invoke, user_question)
        log.info("Successfully generated recommendation.")
        return result
    except Exception as e:
        log.exception(f"Error invoking RAG chain for question: '{user_question[:100]}...'")
        return f"Error: An internal processing error occurred. Check logs. ({type(e).__name__})"

# --- Create Gradio Interface ---
log.info("Creating Gradio Interface...")
iface = gr.Interface(
    fn=get_recommendation,
    inputs=gr.Textbox(
        lines=5,
        label="Your Question / Role Description",
        placeholder="e.g., Need cognitive tests for graduate engineers focusing on problem solving..."
    ),
    outputs=gr.Markdown(label="SHL Assessment Recommendation"),
    title="SHL RAG Assessment Recommender (Async API)",
    description="Enter your requirements below to get AI-powered SHL assessment recommendations. "
                "Initialization happens on startup. This interface provides an ASYNCHRONOUS API endpoint."
)
log.info("Gradio Interface created.")

# --- Launch the Gradio App / CLI Mode ---
if __name__ == "__main__":
    if len(sys.argv) > 1:
        # CLI Mode (using asyncio.run for the asynchronous function)
        question = " ".join(sys.argv[1:])
        print("--- CLI Mode ---")
        print("Question:", question)
        result = asyncio.run(get_recommendation(question))
        print("Prediction:", result)
    else:
        # Server Mode
        log.info("Attempting to launch Gradio app locally with ASYNCHRONOUS API...")
        iface.launch(
            server_name="0.0.0.0",
            server_port=7860,
            share=False
        )
        log.info("Gradio app launched with asynchronous API.")
