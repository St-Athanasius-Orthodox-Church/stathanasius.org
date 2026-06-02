'use client'

import { DownloadIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import { Button } from '@/components/ui/button'
import { Hero } from '@/components/ui/hero'
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select'
import {
  formatHomilyDate,
  getSpeakerImage,
  homilies,
  homilySpeakers,
  type Homily,
} from '@/lib/homilies'

function HomilyCard({ homily }: { homily: Homily }) {
  const speakerImage = getSpeakerImage(homily.speaker)

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-byzantine-blue/10 bg-white p-4 shadow-sm md:flex-row md:items-center md:gap-6 md:p-6">
      <div className="shrink-0">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-orthodox-gold/30 bg-byzantine-blue/5 shadow-sm md:h-20 md:w-20">
          {speakerImage ? (
            <>
              <img
                src={speakerImage}
                alt={homily.speaker}
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100">
                <svg
                  className="h-8 w-8 text-white drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </>
          ) : (
            <svg
              className="h-8 w-8 text-byzantine-blue/60 md:h-10 md:w-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-byzantine-blue md:text-lg">
          {homily.title}
        </h3>
        <p className="text-sm font-medium text-orthodox-gold md:text-base">
          {homily.speaker}
        </p>
        <p className="mt-0.5 text-xs text-byzantine-blue/60 md:text-sm">
          {formatHomilyDate(homily.date)}
        </p>
      </div>

      {homily.audio_url && (
        <div className="w-full shrink-0 md:w-auto">
          <audio controls className="h-10 w-full md:w-64" preload="none">
            <source src={homily.audio_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="mt-2 w-full md:w-auto"
          >
            <a href={homily.audio_download_url ?? homily.audio_url} download>
              <DownloadIcon />
              Download
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}

function HomiliesListContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedSpeaker = searchParams.get('speaker')

  const handleSpeakerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const speaker = e.target.value
    const params = new URLSearchParams()
    if (speaker && speaker !== 'all') {
      params.set('speaker', speaker)
    }
    params.set('page', '1')
    const query = params.toString()
    router.push(query ? `/homilies?${query}` : '/homilies')
  }

  const filteredHomilies =
    selectedSpeaker && selectedSpeaker !== 'all'
      ? homilies.filter((h) => h.speaker === selectedSpeaker)
      : homilies

  return (
    <>
      <Hero size="medium" title="Homilies" />

      <section className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-6 flex items-center gap-4">
          <label
            htmlFor="speaker-filter"
            className="text-sm font-medium text-byzantine-blue"
          >
            Filter by speaker:
          </label>
          <NativeSelect
            id="speaker-filter"
            value={selectedSpeaker ?? 'all'}
            onChange={handleSpeakerChange}
            className="w-[250px]"
          >
            <NativeSelectOption value="all">All speakers</NativeSelectOption>
            {homilySpeakers.map((speaker) => (
              <NativeSelectOption key={speaker} value={speaker}>
                {speaker}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>

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
              {selectedSpeaker && selectedSpeaker !== 'all'
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

export function HomiliesList() {
  return (
    <Suspense fallback={<Hero size="medium" title="Homilies" />}>
      <HomiliesListContent />
    </Suspense>
  )
}
