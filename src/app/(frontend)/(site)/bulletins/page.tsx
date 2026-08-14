import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon, FileTextIcon } from 'lucide-react'

import { Hero } from '@/components/ui/hero'
import { getBulletins, formatBulletinDate, type Bulletin } from '@/lib/bulletins'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination'

export const metadata: Metadata = {
  title: 'Bulletins',
  description: 'Weekly parish bulletins from St. Athanasius Orthodox Church.',
}

export const revalidate = 600

type BulletinsPageProps = {
  searchParams: Promise<{ page?: string | string[] }>
}

function getPageNumber(value: string | string[] | undefined): number {
  const page = Number(Array.isArray(value) ? value[0] : value)

  return Number.isInteger(page) && page > 0 ? page : 1
}

function getPageHref(page: number): string {
  return page === 1 ? '/bulletins' : `/bulletins?page=${page}`
}

function getPageNumbers(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1])
  const numbers = [...pages].filter((page) => page > 0 && page <= totalPages).sort((a, b) => a - b)
  const result: Array<number | 'ellipsis'> = []

  numbers.forEach((page, index) => {
    if (index > 0 && page - numbers[index - 1] > 1) result.push('ellipsis')
    result.push(page)
  })

  return result
}

const paginationLinkClass =
  'inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-byzantine-blue transition-colors hover:bg-byzantine-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orthodox-gold'
const paginationPageClass =
  'inline-flex size-9 items-center justify-center rounded-md text-sm font-medium text-byzantine-blue transition-colors hover:bg-byzantine-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orthodox-gold'
const paginationActivePageClass =
  'inline-flex size-9 items-center justify-center rounded-md border border-byzantine-blue/20 bg-background text-sm font-medium text-byzantine-blue shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orthodox-gold'

function BulletinCard({ bulletin }: { bulletin: Bulletin }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-byzantine-blue/10 bg-white p-4 shadow-sm md:flex-row md:items-center md:gap-4">
      <div className="shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-orthodox-gold/30 bg-byzantine-blue/5 shadow-sm md:h-12 md:w-12">
          <FileTextIcon className="h-5 w-5 text-byzantine-blue/60 md:h-6 md:w-6" />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-byzantine-blue md:text-base">
          {formatBulletinDate(bulletin.date)}
        </p>
      </div>

      {bulletin.pdf_url && (
        <div className="w-full shrink-0 md:w-auto">
          <a
            href={bulletin.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-byzantine-blue px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-byzantine-blue/90 md:w-auto md:justify-start"
          >
            <FileTextIcon className="size-4" />
            View PDF
          </a>
        </div>
      )}
    </div>
  )
}

export default async function BulletinsPage({ searchParams }: BulletinsPageProps) {
  const { page: requestedPage } = await searchParams
  const page = getPageNumber(requestedPage)
  const bulletinPage = await getBulletins(page)

  return (
    <>
      <Hero size="medium" title="Bulletins" />

      <section className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
        {bulletinPage.docs.length === 0 ? (
          <div className="py-16 text-center">
            <FileTextIcon className="mx-auto mb-4 size-14 text-byzantine-blue/30" />
            <p className="text-byzantine-blue/60">No bulletins available yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {bulletinPage.docs.map((bulletin) => (
              <BulletinCard key={bulletin.id} bulletin={bulletin} />
            ))}
          </div>
        )}

        {bulletinPage.totalPages > 1 ? (
          <Pagination className="mt-10">
            <PaginationContent>
              {bulletinPage.hasPrevPage ? (
                <PaginationItem>
                  <Link
                    href={getPageHref(bulletinPage.page - 1)}
                    aria-label="Go to previous page"
                    className={paginationLinkClass}
                  >
                    <ChevronLeftIcon className="size-4" />
                    <span>Previous</span>
                  </Link>
                </PaginationItem>
              ) : null}

              {getPageNumbers(bulletinPage.page, bulletinPage.totalPages).map(
                (pageNumber, index) => (
                  <PaginationItem key={`${pageNumber}-${index}`}>
                    {pageNumber === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <Link
                        href={getPageHref(pageNumber)}
                        aria-current={pageNumber === bulletinPage.page ? 'page' : undefined}
                        className={
                          pageNumber === bulletinPage.page
                            ? paginationActivePageClass
                            : paginationPageClass
                        }
                      >
                        {pageNumber}
                      </Link>
                    )}
                  </PaginationItem>
                ),
              )}

              {bulletinPage.hasNextPage ? (
                <PaginationItem>
                  <Link
                    href={getPageHref(bulletinPage.page + 1)}
                    aria-label="Go to next page"
                    className={paginationLinkClass}
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
