import { useEffect, useState } from "react"
import type { Album } from "@/types/photos"
import { fetchPhotosIndex } from "@/lib/api"
import { UploadForm } from "@/components/UploadForm"
import { AlbumList } from "@/components/AlbumList"
import { PhotoGrid } from '@/components/PhotoGrid'

function App() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPhotosIndex()
      .then(data => setAlbums(data.albums))
      .catch(err => setError(err.message))
  }, [])

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>
  }
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl font-semibold">Family Photos</h1>
      {selectedAlbum ? (
        <PhotoGrid
          album={selectedAlbum}
          onBack={() => setSelectedAlbum(null)}
        />
      ) : (
        <AlbumList
          albums={albums}
          onSelect={setSelectedAlbum}
        />
      )}
      <UploadForm />
    </div>
    
  )
}

export default App
