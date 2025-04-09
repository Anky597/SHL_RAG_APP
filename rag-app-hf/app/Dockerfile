FROM python:3.11-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Set environment variables for caching
ENV HF_HOME=/tmp/.cache
# Keeping TRANSFORMERS_CACHE for backward compatibility
ENV TRANSFORMERS_CACHE=/tmp/.cache

# Change port to 7860 as requested
EXPOSE 7860

# Use preloading to avoid timeout during worker initialization
CMD ["gunicorn", "app_flask_robust:app", "--bind", "0.0.0.0:7860", "--timeout", "300", "--preload", "--workers", "1"]
