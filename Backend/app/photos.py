import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api")

PHOTOS_INDEX = Path("photos.json")

@router.get("/photos")
def read_root():
    return {"Hello": "World"}
# async def get_photos():
#     """Return the photos index"""
#     if not PHOTOS_INDEX.exists():
#         # raise HTTPException(status_code=404, detail="Photos index not found. Run indexing first.")
#         return {"albums": []}
    
#     try:
#         with PHOTOS_INDEX.open("r", encoding="utf-8") as f:
#             return json.load(f)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error reading photos index: {str(e)}")
