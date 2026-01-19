export interface Album {
  id: string
  date: string
  location: string
  path: string
  count: number
  images: string[]
}

export interface PhotosIndex {
  generated_at: string
  albums: Album[]
}
