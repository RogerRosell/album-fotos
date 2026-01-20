import type { PhotosIndex } from "@/types/photos"

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

export async function fetchPhotosIndex(): Promise<PhotosIndex> {
  const res = await fetch(`${API_URL}/api/photos`, {
    cache: "no-cache",
  })

  if (!res.ok) {
    throw new Error("Failed to load photos")
  }

  return res.json()
}
