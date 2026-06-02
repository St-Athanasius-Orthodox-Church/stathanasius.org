import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
import {
  filterHomiliesBySpeaker,
  homilies,
  homilySpeakers,
} from '@/lib/homilies'

import { HomilyCard } from './homily-card'
import { SpeakerFilter } from './speaker-filter'

export const metadata: Metadata = {
  title: 'Homilies',
  description:
    'Orthodox Christian homilies and sermons from St. Athanasius Orthodox Church.',
}

type HomiliesPageProps = {
  searchParams: Promise<{ speaker?: string }>
}

export default async function HomiliesPage({ searchParams }: HomiliesPageProps) {
  const { speaker } = await searchParams
  const selectedSpeaker =
    speaker && speaker !== 'all' && homilySpeakers.includes(speaker)
      ? speaker
      : 'all'
  const filteredHomilies = filterHomiliesBySpeaker(
    homilies,
    selectedSpeaker === 'all' ? undefined : selectedSpeaker,
  )

  return (
    <>
      <Hero size="medium" title="Homilies" />

      <section className="container mx-auto max-w-4xl px-4 py-12">
        <SpeakerFilter
          speakers={homilySpeakers}
          selectedSpeaker={selectedSpeaker}
        />

        {filteredHomilies.length === 0 ? (
          <div className="py-12 text-center">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-byzantine-blue/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            <p className="text-byzantine-blue/60">
              {selectedSpeaker !== 'all'
                ? `No homilies found for ${selectedSpeaker}.`
                : 'No homilies available yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHomilies.map((homily) => (
              <HomilyCard key={homily.id} homily={homily} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
