'use client'

import dynamic from 'next/dynamic'
import { CalendarIcon, ImageIcon } from 'lucide-react'
import { useState } from 'react'

// fslightbox accesses browser globals while it initializes. Keep it out of the
// server-rendered album route so the gallery cannot prevent the page itself
// from rendering.
const FsLightbox = dynamic(() => import('fslightbox-react'), { ssr: false })

import type { Photo } from '@/lib/photo-albums'

type PhotoAlbumGalleryProps = {
  photos: Photo[]
}

export function PhotoAlbumGallery({ photos }: PhotoAlbumGalleryProps) {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  })

  const openLightbox = (index: number) => {
    setLightboxController((current) => ({
      toggler: !current.toggler,
      slide: index + 1,
    }))
  }

  const carouselUrls = photos.map((photo) => photo.carousel_url)

  if (photos.length === 0) {
    return (
      <div className="py-16 text-center">
        <ImageIcon className="mx-auto size-16 text-muted-foreground/50" />
        <h2 className="mt-4 font-cinzel text-xl text-byzantine-blue">
          No Photos in This Album
        </h2>
        <p className="mt-2 text-muted-foreground">Photos will be added soon.</p>
      </div>
    )
  }

  return (
    <>
      <p className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarIcon className="size-4" />
        {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-orthodox-gold focus:ring-offset-2"
          >
            <img
              src={photo.thumbnail_url}
              alt={`Photo ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      <FsLightbox
        toggler={lightboxController.toggler}
        sources={carouselUrls}
        slide={lightboxController.slide}
        type="image"
      />
    </>
  )
}
