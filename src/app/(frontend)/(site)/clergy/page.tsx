import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Hero } from '@/components/ui/hero'
import {
  clergyGroupUrl,
  deacons,
  priests,
  type ClergyMember,
} from '@/lib/clergy'

export const metadata: Metadata = {
  title: 'Our Clergy',
  description:
    'Meet the clergy of St. Athanasius Orthodox Church in Santa Barbara.',
}

function ClergyCard({ member }: { member: ClergyMember }) {
  const content = (
    <>
      <div className="shrink-0">
        <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-orthodox-gold/30 bg-byzantine-blue/5 shadow-sm">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          ) : (
            <svg
              className="h-10 w-10 text-byzantine-blue/30"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1 gap-0">
        <h3 className="text-lg font-semibold text-byzantine-blue">
          {member.name}
        </h3>
        <span className="block font-medium text-orthodox-gold">
          {member.title}
        </span>
        {member.role && (
          <span className="mt-0 block text-sm text-byzantine-blue/60">
            {member.role}
          </span>
        )}
      </div>

      {member.slug && (
        <div className="shrink-0 text-byzantine-blue/30 transition-colors group-hover:text-orthodox-gold">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </>
  )

  const baseClassName =
    'flex items-center gap-6 rounded-lg border border-byzantine-blue/10 bg-white p-6 shadow-sm transition-shadow duration-300'

  if (member.slug) {
    return (
      <Link
        href={`/clergy/${member.slug}`}
        className={`${baseClassName} group cursor-pointer hover:shadow-md`}
      >
        {content}
      </Link>
    )
  }

  return <div className={baseClassName}>{content}</div>
}

export default function ClergyIndex() {
  return (
    <>
      <Hero size="medium" title="Clergy & Lay Leadership" />

      <section className="container mx-auto max-w-4xl px-4 pt-12">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <Image
            src={clergyGroupUrl}
            alt="Clergy and servers of St. Athanasius Orthodox Church"
            width={600}
            height={437}
            sizes="(max-width: 896px) 100vw, 896px"
            className="h-auto w-full object-cover"
          />
        </div>
        <p className="mt-3 text-center text-sm text-byzantine-blue/60">
          Our clergy and servers gathered at St. Athanasius
        </p>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-6 text-xl font-semibold text-byzantine-blue">
          Priests
        </h2>
        <div className="mb-12 space-y-4">
          {priests.map((member) => (
            <ClergyCard key={member.name} member={member} />
          ))}
        </div>

        <h2 className="mb-6 text-xl font-semibold text-byzantine-blue">
          Deacons
        </h2>
        <div className="space-y-4">
          {deacons.map((member) => (
            <ClergyCard key={member.name} member={member} />
          ))}
        </div>
      </section>
    </>
  )
}
