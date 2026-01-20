FROM python:3.13-slim

# Install libvips for image processing
RUN apt-get update && \
    apt-get install -y libvips-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app/ ./app/
COPY pyproject.toml ./
# COPY README.md ./ 

# Create photos directory and initialize photos.json
RUN mkdir -p photos && echo '{"albums": []}' > photos.json

EXPOSE 80

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
