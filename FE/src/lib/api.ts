import type { PhotosIndex } from "@/types/photos"

// Use environment variable if set, otherwise use relative URLs (works with nginx proxy)
const API_URL = import.meta.env.SERVICE_URL_BACKEND || ""

export async function fetchPhotosIndex(): Promise<PhotosIndex> {
  const res = await fetch(`${API_URL}/api/photos`, {
    cache: "no-cache",
  })

  if (!res.ok) {
    throw new Error("Failed to load photos")
  }

  return res.json()
}
