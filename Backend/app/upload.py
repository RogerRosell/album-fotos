from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pathlib import Path
import shutil

from app.config import PHOTOS_ROOT, SEQ_WIDTH
from app.image_processing import convert_to_webp
from app.utils import normalise_location
from app.indexing import main as rebuild_index

router = APIRouter()

@router.post("/upload")
async def upload_photos(
    year: int = Form(...),
    month: int = Form(...),
    day: int = Form(...),
    location: str = Form(...),
    files: list[UploadFile] = File(...)
):
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded")

    folder_name = f"{year:04d}_{month:02d}_{day:02d}-{normalise_location(location)}"
    target_dir = PHOTOS_ROOT / folder_name
    target_dir.mkdir(parents=True, exist_ok=True)

    existing = sorted(target_dir.glob(f"{folder_name}-*.webp"))
    max_seq = (
        max(int(p.stem.split("-")[-1]) for p in existing)
        if existing else 0
    )

    saved = []

    for upload in files:
        max_seq += 1
        seq = f"{max_seq:0{SEQ_WIDTH}d}"
        filename = f"{folder_name}-{seq}.webp"
        output_path = target_dir / filename

        # Save temp file
        tmp_path = output_path.with_suffix(".tmp")
        with tmp_path.open("wb") as buffer:
            shutil.copyfileobj(upload.file, buffer)

        # Convert + strip EXIF
        convert_to_webp(tmp_path, output_path)
        tmp_path.unlink(missing_ok=True)

        saved.append(filename)
    
    rebuild_index()

    return {
        "album": folder_name,
        "count": len(saved),
        "files": saved
    }    
