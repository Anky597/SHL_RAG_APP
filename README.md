# SHL Product Catalogue with RAG-Powered Recommendations

A comprehensive product catalogue application for SHL's assessment solutions, enhanced with AI-powered recommendations using Retrieval Augmented Generation (RAG).

## APP Link : - https://shl-product-catalogue.netlify.app/

# Architecture Diagram
![image](https://github.com/user-attachments/assets/ace1ede6-e628-4d9b-aeeb-abc7eeb0c3b7)

# Sequence Diagram
![image](https://github.com/user-attachments/assets/71ff37ff-0a27-4c21-b099-53a10b16b346)


## Overview

This application serves as an interactive catalogue for SHL's assessment products, allowing users to explore different assessment tools through categories, search functionality, and AI-powered recommendations. The system combines a modern React frontend with a sophisticated RAG backend to provide intelligent product suggestions based on natural language queries.

## Features

- **Product Browsing & Categorization**: Browse products organized by categories
- **Search Functionality**: Find products using keywords and filters
- **AI-Powered Recommendations**: Get personalized product suggestions through natural language queries
- **Detailed Product Information**: View comprehensive details about each assessment tool
- **Responsive Design**: Optimized for all device sizes

## Technical Architecture

### Frontend
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui component library
- **Styling**: Tailwind CSS
- **Routing**: React Router

### Backend
- **API Layer**: Flask with CORS support
- **Deployment**: Render.com (serverless)
- **AI Integration**: Hugging Face Spaces with Gradio interface

### RAG System
- **Vector Database**: Chroma DB (ephemeral storage for serverless deployment)
- **Embedding Model**: Sentence Transformers (`all-MiniLM-L6-v2`)
- **LLM**: Google's Gemini 2.0 Flash
- **Framework**: LangChain for RAG pipeline orchestration

## System Workflow

1. **User Query Submission**:
   - User enters a natural language query in the frontend
   - Query is converted to JSON format and sent to the backend API endpoint

2. **API Processing**:
   - Backend API (hosted on Render) receives the query
   - Forwards the query to Hugging Face Space for RAG processing
   - Note: Free tier on Render may take up to 50 seconds for cold starts

3. **RAG Processing on Hugging Face**:
   - Creates a temporary vector database using the embedding model
   - Indexes product data from JSON files
   - Processes the query using the RAG pipeline:
     - Converts query to embeddings
     - Retrieves relevant documents from vector store
     - Generates a response using Gemini LLM with retrieved context
   - Returns the response to the Render API endpoint

4. **Response Handling**:
   - Backend converts the RAG response to JSON format
   - Sends the formatted response back to the frontend
   - Frontend displays the AI-generated recommendations to the user

## Installation and Setup

### Prerequisites
- Node.js (v16+)
- Python 3.9+
- Google API key for Gemini access

### Frontend Setup
```bash
# Clone the repository
git clone <repository-url>
cd assess-match-horizon-main4

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Set up Python environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export GOOGLE_API_KEY=your_google_api_key
export JSON_DATA_PATH=/path/to/data.json
export VECTOR_DB_PATH=/tmp/chromadb

# Run Flask server
python backend_file.py
```

### Hugging Face Space Setup
The RAG component is deployed as a Hugging Face Space. To replicate:

1. Create a new Gradio Space on Hugging Face
2. Upload the contents of the `rag-app-hf` directory
3. Configure the environment variables in the Space settings
4. Deploy the Space

## Deployment

### Frontend
The frontend is deployed on Netlify/Vercel with the following configuration:
- Build command: `npm run build`
- Publish directory: `dist`

### Backend
The backend is deployed on Render.com with:
- Runtime: Python 3.9
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn app:app`
- Environment variables:
  - `HF_GRADIO_API_SPACE`: Your Hugging Face Space name
  - `GOOGLE_API_KEY`: Your Google API key
  - `JSON_DATA_PATH`: Path to product data JSON
  - `VECTOR_DB_PATH`: Path for temporary vector database

## Performance Considerations

- **Cold Start**: The free tier on Render has cold starts that can take up to 50 seconds
- **Ephemeral Storage**: The vector database is recreated for each request due to serverless constraints
- **Optimization**: For production use, consider:
  - Upgrading to paid tiers for persistent storage
  - Pre-computing embeddings and storing them
  - Implementing caching for common queries

## Future Enhancements

- Implement user authentication and personalized recommendations
- Add product comparison functionality
- Integrate usage analytics to improve recommendations
- Implement offline mode with cached recommendations

## License

[MIT License](LICENSE)

## Acknowledgements

- SHL for providing the product data
- Hugging Face for hosting the RAG component
- Google for Gemini API access
