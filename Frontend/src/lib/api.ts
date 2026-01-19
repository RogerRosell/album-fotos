import type { PhotosIndex } from "@/types/photos"

export async function fetchPhotosIndex(): Promise<PhotosIndex> {
  const res = await fetch("http://127.0.0.1:8000/api/photos", {
    cache: "no-cache",
  })

  if (!res.ok) {
    throw new Error("Failed to load photos")
  }

  return res.json()
}
