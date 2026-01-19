import re
from unidecode import unidecode

def normalise_location(value: str) -> str:
    value = unidecode(value.strip())
    value = value.title()
    value = re.sub(r"\s+", "_", value)
    value = re.sub(r"[^A-Za-z0-9_-]", "", value)
    return value
