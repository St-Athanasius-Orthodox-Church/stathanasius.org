import { DownloadIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  formatHomilyDate,
  getSpeakerImage,
  type Homily,
} from '@/lib/homilies'

export function HomilyCard({ homily }: { homily: Homily }) {
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
