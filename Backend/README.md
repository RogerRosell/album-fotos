# Family Photo Album Backend

This repository contains the **backend service** for a private, family-only photo album application.

The system is intentionally **simple, filesystem-based, and archival-friendly**.
There is **no database**, **no EXIF dependency**, and **no complex metadata model**.

The filesystem is the source of truth.

---

## Goals & Design Principles

* Simple and durable over clever
* Human-readable file and folder structure
* Deterministic naming (no collisions)
* Privacy-first (EXIF stripped)
* Fast frontend via static assets + JSON index
* Easy backup and long-term maintenance

This is designed to still make sense **10+ years from now**.

---

## What’s Implemented So Far

### ✅ Backend stack

* Python
* FastAPI
* Virtual environment (`venv`)
* WebP image conversion
* EXIF stripping
* Deterministic folder + filename generation
* Upload endpoint (multi-file / folder uploads)

### ❌ Not implemented yet

* Authentication
* Frontend
* JSON index (`photos.json`)
* Static file serving (nginx)
* Thumbnails / multiple sizes

These are planned next.

---

## Folder & Filename Convention (Canonical)

### Album folder

```
YYYY_MM_DD-LOCATION
```

Example:

```
2023_07_15-Barcelona
```

### Image filenames

```
YYYY_MM_DD-LOCATION-SEQ.webp
```

Example:

```
2023_07_15-Barcelona-001.webp
2023_07_15-Barcelona-002.webp
```

**Rules**

* `SEQ` is zero-padded and incremental per folder
* Client filenames are ignored
* Backend guarantees uniqueness
* Images are append-only (never overwritten)

---

## Metadata Model

There is **no database**.

Metadata is defined as:

* `year`, `month`, `day`, `location` → provided by the user at upload time
* Folder name → derived from user input
* Image order → derived from filename sequence

### Explicitly ignored

* EXIF dates
* EXIF GPS
* Camera metadata

All EXIF data is stripped during conversion for:

* Smaller file size
* Privacy
* Predictable behaviour

---

## Repository Structure

```
family-photos-backend/
├── README.md
├── requirements.txt
├── venv/
├── app/
│   ├── main.py            # FastAPI app entrypoint
│   ├── config.py          # Global configuration
│   ├── upload.py          # Upload endpoint
│   ├── image_processing.py# WebP conversion + EXIF stripping
│   ├── utils.py           # Normalisation helpers
│   └── indexing.py        # (planned) photos.json generation
└── photos/                # Photo archive root
```

`photos/` is the **archive** and should be treated as immutable data.

---

## Environment Setup

### 1. Create virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the server

```bash
uvicorn app.main:app --reload
```

Open:

```
http://127.0.0.1:8000/docs
```

FastAPI provides an interactive UI for testing uploads.

---

## Upload API

### `POST /upload`

**Form fields**

* `year` (int)
* `month` (int)
* `day` (int)
* `location` (string)
* `files` (one or more images, folder upload supported)

**Behaviour**

* Creates or reuses target album folder
* Converts all images to WebP
* Strips all EXIF metadata
* Auto-rotates images
* Assigns sequential filenames
* Appends to existing folders safely

**Response**

```json
{
  "album": "2023_07_15-Barcelona",
  "count": 3,
  "files": [
    "2023_07_15-Barcelona-001.webp",
    "2023_07_15-Barcelona-002.webp",
    "2023_07_15-Barcelona-003.webp"
  ]
}
```

---

## Design Constraints (Non-Negotiable)

* Frontend never writes files
* Backend always generates names
* Client filenames are ignored
* Files are immutable once written
* `photos/` is the source of truth
* Metadata is curated, not inferred

---

## Planned Next Steps

1. Generate `photos.json` by scanning the filesystem
2. Serve `/photos` statically (nginx)
3. Build a fast, read-only frontend gallery
4. Add simple authentication (optional)
5. Add thumbnails / multiple image sizes (optional)

---

## Philosophy

This project intentionally avoids:

* Databases
* AI tagging
* Implicit metadata
* Complex auth
* Overengineering

The result is a **boring, reliable, long-lived family archive** that can be understood by anyone with a file browser.

---

## License

Private, family use.

---

If you are future-me reading this:
**Do not complicate this unless you absolutely have to.**
