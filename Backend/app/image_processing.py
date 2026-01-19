import pyvips
from pathlib import Path
from app.config import WEBP_QUALITY

def convert_to_webp(input_path: Path, output_path: Path) -> None:
    image = pyvips.Image.new_from_file(str(input_path), autorotate=True)

    image.write_to_file(
        str(output_path),
        Q=WEBP_QUALITY,
        strip=True  # removes all metadata
    )
