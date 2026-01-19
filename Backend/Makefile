# Family Photos Backend - Makefile

.PHONY: help setup run rebuild-index lint clean

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

setup:
	python3 -m venv venv
	$(PIP) install --upgrade pip
	$(PIP) install -r requirements.txt

run:
	$(UVICORN) app.main:app --reload

rebuild-index:
	$(PYTHON) -m app.indexing

lint:
	$(PYTHON) -m compileall app

clean:
	find photos -name "*.tmp" -delete
	find . -name "**pycache**" -type d -exec rm -rf {} +
