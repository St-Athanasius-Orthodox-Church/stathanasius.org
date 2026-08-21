import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Hero } from '@/components/ui/hero'
import { clergySlugs, getClergyBio } from '@/lib/clergy'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return clergySlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const member = getClergyBio(slug)

  if (!member) {
    return { title: 'Clergy Member Not Found' }
  }

  return {
    title: member.name,
    description: `${member.name}, ${member.title} at St. Athanasius Orthodox Church in Santa Barbara.`,
    alternates: {
      canonical: `/clergy/${slug}`,
    },
    openGraph: mergeOpenGraph({
      title: `${member.name} - St. Athanasius Orthodox Church`,
      description: `${member.name}, ${member.title} at St. Athanasius Orthodox Church in Santa Barbara.`,
      url: `/clergy/${slug}`,
    }),
  }
}

export default async function ClergyShow({ params }: PageProps) {
  const { slug } = await params
  const member = getClergyBio(slug)

  if (!member) {
    notFound()
  }

  return (
    <>
      <Hero size="medium" title={member.name} subtitle={member.title} />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <Link
          href="/clergy"
          className="mb-8 inline-flex items-center gap-2 text-sm text-byzantine-blue/60 transition-colors hover:text-orthodox-gold"
        >
          <span>←</span>
          <span>Back to Clergy</span>
        </Link>

        <article className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="shrink-0">
            <div className="relative mx-auto flex h-48 w-48 items-center justify-center overflow-hidden rounded-lg border-2 border-orthodox-gold/30 bg-byzantine-blue/5 shadow-md md:mx-0">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="192px"
                  className="object-cover object-top"
                />
              ) : (
                <svg
                  className="h-24 w-24 text-byzantine-blue/20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <div className="space-y-4 text-byzantine-blue/80">
              {member.bio.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </section>
    </>
  )
}
