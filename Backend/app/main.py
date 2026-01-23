from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.upload import router as upload_router
from app.photos import router as photos_router
from fastapi.staticfiles import StaticFiles
from app.config import PHOTOS_ROOT
from fastapi.responses import FileResponse
from pathlib import Path

app = FastAPI(title="Family Photo Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://album.rrc.gdn"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(photos_router)

# DEV ONLY: serve photos statically
app.mount("/photos", StaticFiles(directory=PHOTOS_ROOT), name="photos")
@app.get("/photos.json")
def get_photos_index():
    return FileResponse(Path("photos.json"))