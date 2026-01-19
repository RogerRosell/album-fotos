import json
import re
from pathlib import Path
from datetime import datetime

from app.config import PHOTOS_ROOT

OUTPUT_FILE = Path("photos.json")
TMP_OUTPUT_FILE = OUTPUT_FILE.with_suffix(".json.tmp")

ALBUM_PATTERN = re.compile(
    r"^(?P<year>\d{4})_(?P<month>\d{1,2})_(?P<day>\d{1,2})-(?P<location>.+)$"
)

def parse_album_folder(folder: Path) -> dict | None:

  match = ALBUM_PATTERN.match(folder.name)
  if not match:
    return None

  year = match.group("year")
  month = match.group("month")
  day = match.group("day")
  location = match.group("location")

  return {
      "id": folder.name,
      "date": f"{year}-{month}-{day}",
      "location": location,
      "path": folder.name,
}

def collect_images(folder: Path, album_id: str) -> list[str]:
  
  pattern = f"{album_id}-*.webp"
  images = [
  p.name
  for p in folder.glob(pattern)
  if p.is_file()
  ]

  images.sort()
  return images

def build_index() -> dict:
  
  albums = []

  for folder in sorted(PHOTOS_ROOT.iterdir()):
      if not folder.is_dir():
          continue

      album_meta = parse_album_folder(folder)
      if album_meta is None:
          continue

      images = collect_images(folder, album_meta["id"])
      if not images:
          continue  # skip empty albums

      album_meta["count"] = len(images)
      album_meta["images"] = images

      albums.append(album_meta)

  # Sort albums newest first by date
  albums.sort(key=lambda a: a["date"], reverse=True)

  return {
      "generated_at": datetime.utcnow().isoformat(timespec="seconds") + "Z",
      "albums": albums,
  }

def write_index(data: dict) -> None:
  
  with TMP_OUTPUT_FILE.open("w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
  
  TMP_OUTPUT_FILE.replace(OUTPUT_FILE)

def main() -> None:
  index = build_index()
  write_index(index)

  print(f"Indexed {len(index['albums'])} albums → {OUTPUT_FILE}")

if __name__ == "__main__":
  main()