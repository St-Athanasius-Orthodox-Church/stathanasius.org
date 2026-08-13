import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Hero } from '@/components/ui/hero'
import { formatAlbumDate, getPhotoAlbum, getPhotoAlbums } from '@/lib/photo-albums'

import { PhotoAlbumGallery } from './photo-album-gallery'

export const revalidate = 600

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const albums = await getPhotoAlbums()

  return albums.docs.map(({ id }) => ({
    id,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  const album = await getPhotoAlbum(id)

  if (!album) {
    return { title: 'Photo Album Not Found' }
  }

  return {
    title: `${album.title} - Photo Albums`,
    description: `Photos from ${album.title} at St. Athanasius Orthodox Church.`,
  }
}

export default async function PhotoAlbumShow({ params }: PageProps) {
  const { id } = await params
  const album = await getPhotoAlbum(id)

  if (!album) {
    notFound()
  }

  return (
    <>
      <Hero
        size="medium"
        title={album.title}
        subtitle={formatAlbumDate(album.date)}
      />

      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/photo-albums">
              <ArrowLeftIcon className="size-4" />
              Back to Albums
            </Link>
          </Button>
        </div>

        <PhotoAlbumGallery photos={album.photos} />
      </section>
    </>
  )
}
