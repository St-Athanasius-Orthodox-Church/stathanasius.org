import type { Metadata } from 'next'
import Link from 'next/link'
import { CalendarIcon, ImageIcon } from 'lucide-react'

import { Hero } from '@/components/ui/hero'
import { MainLayout } from '@/layouts/main-layout'
import { formatAlbumDate, photoAlbums } from '@/lib/photo-albums'

export const metadata: Metadata = {
  title: 'Photo Albums',
  description:
    'Photos from events and life at St. Athanasius Orthodox Church.',
}

export default function PhotoAlbumsIndex() {
  return (
    <MainLayout>
      <Hero
        size="medium"
        title="Photo Albums"
        subtitle="Moments captured from our parish life"
      />

      <section className="container mx-auto px-4 py-12">
        {photoAlbums.length === 0 ? (
          <div className="py-16 text-center">
            <ImageIcon className="mx-auto size-16 text-muted-foreground/50" />
            <h2 className="mt-4 font-cinzel text-xl text-byzantine-blue">
              No Photo Albums Yet
            </h2>
            <p className="mt-2 text-muted-foreground">
              Check back soon for photos from our parish events.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photoAlbums.map((album) => (
              <Link
                key={album.id}
                href={`/photo-albums/${album.id}`}
                className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:border-orthodox-gold/50 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  {album.cover_photo_url ? (
                    <img
                      src={album.cover_photo_url}
                      alt={album.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-byzantine-blue/10">
                      <ImageIcon className="size-16 text-byzantine-blue/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute right-0 bottom-0 left-0 p-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-byzantine-blue">
                      <ImageIcon className="size-3" />
                      {album.photo_count}{' '}
                      {album.photo_count === 1 ? 'photo' : 'photos'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-cinzel text-lg font-medium text-byzantine-blue transition-colors group-hover:text-orthodox-gold">
                    {album.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarIcon className="size-3.5" />
                    {formatAlbumDate(album.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  )
}
