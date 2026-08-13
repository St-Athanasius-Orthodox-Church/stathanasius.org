import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ImageIcon } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { Hero } from '@/components/ui/hero'
import { formatAlbumDate, getPhotoAlbums } from '@/lib/photo-albums'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Photo Albums',
  description: 'Photos from events and life at St. Athanasius Orthodox Church.',
}

type PhotoAlbumsPageProps = {
  searchParams: Promise<{ page?: string | string[] }>
}

function getPageNumber(value: string | string[] | undefined): number {
  const page = Number(Array.isArray(value) ? value[0] : value)

  return Number.isInteger(page) && page > 0 ? page : 1
}

function getPageHref(page: number): string {
  return page === 1 ? '/photo-albums' : `/photo-albums?page=${page}`
}

export default async function PhotoAlbumsIndex({ searchParams }: PhotoAlbumsPageProps) {
  const { page: requestedPage } = await searchParams
  const page = getPageNumber(requestedPage)
  const photoAlbums = await getPhotoAlbums(page)

  return (
    <>
      <Hero size="medium" title="Photo Albums" subtitle="Moments captured from our parish life" />

      <section className="container mx-auto px-4 py-12">
        {photoAlbums.docs.length === 0 ? (
          <div className="py-16 text-center">
            <ImageIcon className="mx-auto size-16 text-muted-foreground/50" />
            <h2 className="mt-4 font-cinzel text-xl text-byzantine-blue">No Photo Albums Yet</h2>
            <p className="mt-2 text-muted-foreground">
              Check back soon for photos from our parish events.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photoAlbums.docs.map((album) => (
              <Link
                key={album.id}
                href={`/photo-albums/${album.id}`}
                className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:border-orthodox-gold/50 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  {album.cover_photo_url ? (
                    <Image
                      src={album.cover_photo_url}
                      alt={album.title}
                      fill
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                      {album.photo_count} {album.photo_count === 1 ? 'photo' : 'photos'}
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

        {photoAlbums.totalPages > 1 ? (
          <Pagination className="mt-10">
            <PaginationContent>
              {photoAlbums.hasPrevPage ? (
                <PaginationItem>
                  <Link
                    href={getPageHref(photoAlbums.page - 1)}
                    aria-label="Go to previous page"
                    className={cn(buttonVariants({ variant: 'ghost', size: 'default' }), 'gap-1')}
                  >
                    <ChevronLeftIcon className="size-4" />
                    <span>Previous</span>
                  </Link>
                </PaginationItem>
              ) : null}

              {Array.from({ length: photoAlbums.totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <Link
                      href={getPageHref(pageNumber)}
                      aria-current={pageNumber === photoAlbums.page ? 'page' : undefined}
                      className={buttonVariants({
                        variant: pageNumber === photoAlbums.page ? 'outline' : 'ghost',
                        size: 'icon',
                      })}
                    >
                      {pageNumber}
                    </Link>
                  </PaginationItem>
                ),
              )}

              {photoAlbums.hasNextPage ? (
                <PaginationItem>
                  <Link
                    href={getPageHref(photoAlbums.page + 1)}
                    aria-label="Go to next page"
                    className={cn(buttonVariants({ variant: 'ghost', size: 'default' }), 'gap-1')}
                  >
                    <span>Next</span>
                    <ChevronRightIcon className="size-4" />
                  </Link>
                </PaginationItem>
              ) : null}
            </PaginationContent>
          </Pagination>
        ) : null}
      </section>
    </>
  )
}
