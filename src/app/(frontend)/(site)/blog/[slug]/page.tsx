import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/ui/hero'
import { formatPostDate, getAllPostSlugs, getPost } from '@/lib/posts'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const revalidate = 600

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: 'Article Not Found' }
  }

  return {
    title: `${post.title} - Blog`,
    description:
      post.excerpt || 'An article from the priest of St. Athanasius Orthodox Church.',
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: mergeOpenGraph({
      title: `${post.title} - St. Athanasius Orthodox Church`,
      description:
        post.excerpt || 'An article from the priest of St. Athanasius Orthodox Church.',
      type: 'article',
      url: `/blog/${slug}`,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
    }),
  }
}

export default async function PostShow({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const byline = [formatPostDate(post.published_at), post.author]
    .filter(Boolean)
    .join(' · ')

  return (
    <>
      <Hero size="medium" title={post.title} subtitle={byline} />

      <section className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/blog">
              <ArrowLeftIcon className="size-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {post.cover_image_url ? (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-lg shadow-lg">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              priority
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        ) : null}

        <RichText data={post.content} enableGutter={false} />
      </section>
    </>
  )
}
