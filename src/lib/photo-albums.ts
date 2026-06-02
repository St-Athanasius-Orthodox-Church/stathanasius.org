export type PhotoAlbumSummary = {
  id: string
  title: string
  date: string
  photo_count: number
  cover_photo_url: string | null
}

export type Photo = {
  id: string
  thumbnail_url: string
  carousel_url: string
}

export type PhotoAlbumDetail = {
  id: string
  title: string
  date: string
  photos: Photo[]
}

/** Placeholder until albums are wired from Payload. */
export const photoAlbums: PhotoAlbumSummary[] = []

export function getPhotoAlbum(_id: string): PhotoAlbumDetail | null {
  return null
}

export function formatAlbumDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
