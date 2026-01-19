# Family Photos Backend - Makefile

.PHONY: help setup run rebuild-index lint clean docker-build docker-up docker-down docker-logs

PYTHON := venv/bin/python
PIP := venv/bin/pip
UVICORN := venv/bin/uvicorn

help:
	@echo "Family Photos Backend - Makefile"
	@echo "Available commands:"
	@echo ""
	@echo "  make setup          Create venv and install dependencies"
	@echo "  make run            Run FastAPI server (dev mode)"
	@echo "  make rebuild-index  Regenerate photos.json from filesystem"
	@echo "  make lint           Run basic code checks"
	@echo "  make clean          Remove temporary files (safe)"
	@echo ""
	@echo "Docker commands:"
	@echo "  make docker-build   Build Docker image"
	@echo "  make docker-up      Start containers"
	@echo "  make docker-down    Stop containers"
	@echo "  make docker-logs    View container logs"
	@echo ""

setup:
	python3 -m venv venv
	$(PIP) install --upgrade pip
	$(PIP) install -r requirements.txt

run:
	$(UVICORN) app.main:app

rebuild-index:
	$(PYTHON) -m app.indexing

lint:
	$(PYTHON) -m compileall app

clean:
	find photos -name "*.tmp" -delete
	find . -name "**pycache**" -type d -exec rm -rf {} +

# Docker commands
docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f backend
