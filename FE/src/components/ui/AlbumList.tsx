import type { Album } from "@/types/photos"

interface AlbumListProps {
  albums: Album[]
  onSelect: (album: Album) => void
}

export function AlbumList({ albums, onSelect }: AlbumListProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {albums && albums.map(album => (
        <li
          key={album.id}
          onClick={() => onSelect(album)}
          className="border rounded-lg p-4 hover:bg-muted cursor-pointer transition"
        >
          <div className="font-medium">{album.location}</div>
          <div className="text-sm text-muted-foreground">
            {album.date} · {album.count} photos
          </div>
        </li>
      ))}
    </ul>
  )
}
