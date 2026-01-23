import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

PHOTOS_ROOT = Path("photos")
PHOTOS_ROOT.mkdir(exist_ok=True)

WEBP_QUALITY = 85
SEQ_WIDTH = 3

FRONTEND_URL = os.getenv("SERVICE_URL_FRONTEND")
