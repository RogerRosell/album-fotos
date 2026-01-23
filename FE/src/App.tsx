import { useEffect, useState } from "react"
import type { Album } from "@/types/photos"
import { fetchPhotosIndex } from "@/lib/api"
import { PhotoGrid } from '@/components/PhotoGrid'
import { AlbumList } from '@/components/AlbumList'
import { UploadForm } from "@/components/UploadForm";

function App() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [showUploadForm, setShowUploadForm] = useState(false) 
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
    <div className="p-6 max-w-7xl mx-auto space-y-2">
      <h1 className="text-2xl font-semibold">Album Familiar</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setShowUploadForm(!showUploadForm)}
      >
        {showUploadForm ? "X" : "Subir Fotos"}
      </button>
      {showUploadForm && <UploadForm />}
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
    </div>
  )
}

export default App
