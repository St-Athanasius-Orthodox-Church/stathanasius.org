import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpenIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Hero } from '@/components/ui/hero'
import { getPosts, formatPostDate, type PostSummary } from '@/lib/posts'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Weekly articles from the priest of St. Athanasius Orthodox Church.',
}

export const revalidate = 600

type BlogPageProps = {
  searchParams: Promise<{ page?: string | string[] }>
}

function getPageNumber(value: string | string[] | undefined): number {
  const page = Number(Array.isArray(value) ? value[0] : value)

  return Number.isInteger(page) && page > 0 ? page : 1
}

function getPageHref(page: number): string {
  return page === 1 ? '/blog' : `/blog?page=${page}`
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

function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:border-orthodox-gold/50 hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-byzantine-blue/10">
            <BookOpenIcon className="size-16 text-byzantine-blue/30" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="font-cinzel text-lg font-medium text-byzantine-blue transition-colors group-hover:text-orthodox-gold">
          {post.title}
        </h2>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarIcon className="size-3.5" />
          {formatPostDate(post.published_at)}
        </p>
        {post.excerpt ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-byzantine-blue/70">
            {post.excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  )
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: requestedPage } = await searchParams
  const page = getPageNumber(requestedPage)
  const postPage = await getPosts(page)

  return (
    <>
      <Hero size="medium" title="Blog" subtitle="Weekly articles from our priest" />

      <section className="container mx-auto px-4 py-12">
        {postPage.docs.length === 0 ? (
          <div className="py-16 text-center">
            <BookOpenIcon className="mx-auto size-16 text-muted-foreground/50" />
            <h2 className="mt-4 font-cinzel text-xl text-byzantine-blue">No Articles Yet</h2>
            <p className="mt-2 text-muted-foreground">Check back soon for articles from our priest.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {postPage.docs.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {postPage.totalPages > 1 ? (
          <Pagination className="mt-10">
            <PaginationContent>
              {postPage.hasPrevPage ? (
                <PaginationItem>
                  <Link
                    href={getPageHref(postPage.page - 1)}
                    aria-label="Go to previous page"
                    className={paginationLinkClass}
                  >
                    <ChevronLeftIcon className="size-4" />
                    <span>Previous</span>
                  </Link>
                </PaginationItem>
              ) : null}

              {getPageNumbers(postPage.page, postPage.totalPages).map((pageNumber, index) => (
                <PaginationItem key={`${pageNumber}-${index}`}>
                  {pageNumber === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <Link
                      href={getPageHref(pageNumber)}
                      aria-current={pageNumber === postPage.page ? 'page' : undefined}
                      className={
                        pageNumber === postPage.page
                          ? paginationActivePageClass
                          : paginationPageClass
                      }
                    >
                      {pageNumber}
                    </Link>
                  )}
                </PaginationItem>
              ))}

              {postPage.hasNextPage ? (
                <PaginationItem>
                  <Link
                    href={getPageHref(postPage.page + 1)}
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
