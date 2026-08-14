import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon, Mic2Icon } from 'lucide-react'

import { Hero } from '@/components/ui/hero'
import { getHomilies } from '@/lib/homilies'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination'
import { HomilyCard } from './homily-card'
import { SpeakerFilter } from './speaker-filter'

export const metadata: Metadata = {
  title: 'Homilies',
  description: 'Orthodox Christian homilies and sermons from St. Athanasius Orthodox Church.',
}

export const revalidate = 600

type HomiliesPageProps = {
  searchParams: Promise<{ page?: string | string[]; speaker?: string | string[] }>
}

function getPageNumber(value: string | string[] | undefined): number {
  const page = Number(Array.isArray(value) ? value[0] : value)

  return Number.isInteger(page) && page > 0 ? page : 1
}

function getPageHref(page: number, speaker: string): string {
  const params = new URLSearchParams()

  if (page > 1) params.set('page', String(page))
  if (speaker !== 'all') params.set('speaker', speaker)

  const query = params.toString()
  return query ? `/homilies?${query}` : '/homilies'
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

export default async function HomiliesPage({ searchParams }: HomiliesPageProps) {
  const { page: requestedPage, speaker: requestedSpeaker } = await searchParams
  const page = getPageNumber(requestedPage)
  const speaker = Array.isArray(requestedSpeaker) ? requestedSpeaker[0] : requestedSpeaker
  const homilyPage = await getHomilies(page, speaker)

  return (
    <>
      <Hero size="medium" title="Homilies" />

      <section className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
        <SpeakerFilter
          speakers={homilyPage.speakers}
          selectedSpeaker={homilyPage.selectedSpeaker}
        />

        {homilyPage.docs.length === 0 ? (
          <div className="py-16 text-center">
            <Mic2Icon className="mx-auto mb-4 size-14 text-byzantine-blue/30" />
            <p className="text-byzantine-blue/60">
              {homilyPage.selectedSpeaker !== 'all'
                ? `No homilies found for ${homilyPage.selectedSpeaker}.`
                : 'No homilies available yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {homilyPage.docs.map((homily) => (
              <HomilyCard key={homily.id} homily={homily} />
            ))}
          </div>
        )}

        {homilyPage.totalPages > 1 ? (
          <Pagination className="mt-10">
            <PaginationContent>
              {homilyPage.hasPrevPage ? (
                <PaginationItem>
                  <Link
                    href={getPageHref(homilyPage.page - 1, homilyPage.selectedSpeaker)}
                    aria-label="Go to previous page"
                    className={paginationLinkClass}
                  >
                    <ChevronLeftIcon className="size-4" />
                    <span>Previous</span>
                  </Link>
                </PaginationItem>
              ) : null}

              {getPageNumbers(homilyPage.page, homilyPage.totalPages).map((pageNumber, index) => (
                <PaginationItem key={`${pageNumber}-${index}`}>
                  {pageNumber === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <Link
                      href={getPageHref(pageNumber, homilyPage.selectedSpeaker)}
                      aria-current={pageNumber === homilyPage.page ? 'page' : undefined}
                      className={
                        pageNumber === homilyPage.page
                          ? paginationActivePageClass
                          : paginationPageClass
                      }
                    >
                      {pageNumber}
                    </Link>
                  )}
                </PaginationItem>
              ))}

              {homilyPage.hasNextPage ? (
                <PaginationItem>
                  <Link
                    href={getPageHref(homilyPage.page + 1, homilyPage.selectedSpeaker)}
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
