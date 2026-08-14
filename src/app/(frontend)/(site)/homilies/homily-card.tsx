import { DownloadIcon } from 'lucide-react'
import Image from 'next/image'

import { formatHomilyDate, type Homily } from '@/lib/homilies'

export function HomilyCard({ homily }: { homily: Homily }) {
  return (
    <article className="group flex flex-col gap-4 rounded-lg border border-byzantine-blue/10 bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-center md:gap-6 md:p-6">
      <div className="shrink-0">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-orthodox-gold/40 bg-byzantine-blue/5 shadow-sm md:h-20 md:w-20">
          {homily.speaker_image_url ? (
            <Image
              src={homily.speaker_image_url}
              alt={homily.speaker}
              fill
              className="h-full w-full object-cover object-top"
              loading="lazy"
              sizes="80px"
              unoptimized
            />
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
          {homily.audio_url && homily.speaker_image_url ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <svg
                className="h-8 w-8 text-white drop-shadow-lg"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          ) : null}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="font-crimson-pro text-lg font-semibold text-byzantine-blue md:text-xl">
          {homily.title}
        </h2>
        <p className="text-sm font-medium text-orthodox-gold md:text-base">{homily.speaker}</p>
        <p className="mt-0.5 text-xs text-byzantine-blue/60 md:text-sm">
          {formatHomilyDate(homily.date)}
        </p>
      </div>

      {homily.audio_url ? (
        <div className="w-full shrink-0 md:w-auto">
          <audio
            controls
            className="h-10 w-full md:w-64"
            preload="none"
            aria-label={`Play ${homily.title}`}
          >
            <source src={homily.audio_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <a
            href={homily.audio_download_url ?? homily.audio_url}
            download
            className="mt-2 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm font-medium shadow-xs transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:w-auto"
          >
            <DownloadIcon />
            Download
          </a>
        </div>
      ) : null}
    </article>
  )
}
