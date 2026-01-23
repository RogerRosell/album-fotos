import type { Album } from "@/types/photos"
import { Button } from "@/components/button"

interface PhotoGridProps {
  album: Album
  onBack: () => void
}

const IMAGES_URL = import.meta.env.VITE_API_URL || ""

export function PhotoGrid({ album, onBack }: PhotoGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>

        <div>
          <div className="font-medium">{album.location}</div>
          <div className="text-sm text-muted-foreground">
            {album.date} · {album.count} photos
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {album.images.map(image => (
          <img
            key={image}
            src={`${IMAGES_URL}/photos/${album.path}/${image}`}
            alt=""
            loading="lazy"
            className="w-full aspect-square object-cover rounded"
          />
        ))}
      </div>
    </div>
  )
}
