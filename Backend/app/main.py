from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.upload import router as upload_router
from app.photos import router as photos_router
from fastapi.staticfiles import StaticFiles
from app.config import PHOTOS_ROOT, FRONTEND_URL
from fastapi.responses import FileResponse
from pathlib import Path

from app.auth import authenticate_user

app = FastAPI(title="Family Photo Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(photos_router)

@app.get("/protected")
async def protected_route(current_user: str = Depends(authenticate_user)):
    return {"message": f"Hello {current_user}, this is a protected route!"}

# DEV ONLY: serve photos statically
app.mount("/photos", StaticFiles(directory=PHOTOS_ROOT), name="photos")
@app.get("/photos.json")
def get_photos_index():
    return FileResponse(Path("photos.json"))