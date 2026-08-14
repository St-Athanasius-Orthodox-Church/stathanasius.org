import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Audio, Homily as PayloadHomily, Media, Person } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export interface Homily {
  id: string
  title: string
  speaker: string
  date: string
  audio_url: string | null
  audio_download_url: string | null
  speaker_image_url: string | null
}

export interface HomilyPage {
  docs: Homily[]
  speakers: string[]
  selectedSpeaker: string
  hasNextPage: boolean
  hasPrevPage: boolean
  page: number
  totalPages: number
}

const frSymeonUrl = '/assets/fr-symeon.jpg'
const frNicholasUrl = '/assets/fr-nicholas.jpg'
const frJohnFinleyUrl = '/assets/fr-john-finley.jpg'
const frJonBraunUrl = '/assets/fr-jon-braun.jpg'
const frJohnCarrilloUrl = '/assets/fr-john-carillo.jpg'
const dnGaryUrl = '/assets/dn-gary.jpg'

const speakerImageMap: Record<string, string> = {
  'Rev. Fr. Symeon Halsell': frSymeonUrl,
  'Fr. Symeon Halsell': frSymeonUrl,
  'Very Rev. Fr. Nicholas Speier': frNicholasUrl,
  'Fr. Nicholas Speier': frNicholasUrl,
  'Very Rev. Fr. John Finley': frJohnFinleyUrl,
  'Fr. John Finley': frJohnFinleyUrl,
  'Very Rev. Fr. Jon Braun': frJonBraunUrl,
  'Fr. Jon Braun': frJonBraunUrl,
  'Rev. Fr. John Carrillo': frJohnCarrilloUrl,
  'Fr. John Carrillo': frJohnCarrilloUrl,
  'Rev. Dn. Gary Braun': dnGaryUrl,
  'Dn. Gary Braun': dnGaryUrl,
}

export function getSpeakerImage(speaker: string): string | null {
  return speakerImageMap[speaker] ?? null
}

function getSpeakerPhotoUrl(person: Person | null): string | null {
  if (!person || typeof person.photo !== 'object' || !person.photo) {
    return null
  }

  const photo = person.photo as Media

  return photo.url ? getMediaUrl(photo.url, photo.updatedAt) : null
}

function getAudioUrl(audio: Audio | null): string | null {
  if (!audio) return null

  if (audio.url) {
    return getMediaUrl(audio.url, audio.updatedAt)
  }

  return audio.filename ? `/audios/${encodeURIComponent(audio.filename)}` : null
}

function toHomily(doc: PayloadHomily): Homily {
  const person = typeof doc.speaker === 'object' ? doc.speaker : null
  const audio = typeof doc.audio === 'object' ? doc.audio : null
  const speaker = person?.name || 'Unknown speaker'
  const audioUrl = getAudioUrl(audio)

  return {
    id: String(doc.id),
    title: doc.title,
    speaker,
    date: doc.date,
    audio_url: audioUrl,
    audio_download_url: audioUrl,
    speaker_image_url: getSpeakerPhotoUrl(person) || getSpeakerImage(speaker),
  }
}

export function formatHomilyDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export const getHomilies = cache(
  async (page = 1, requestedSpeaker?: string): Promise<HomilyPage> => {
    const payload = await getPayload({ config: configPromise })

    const speakerSource = await payload.find({
      collection: 'homilies',
      depth: 1,
      limit: 1000,
      pagination: false,
      overrideAccess: false,
    })
    const speakerDocs = speakerSource.docs
      .map((homily) => (typeof homily.speaker === 'object' ? homily.speaker : null))
      .filter((person): person is Person => person !== null)
    const speakers = [...new Set(speakerDocs.map((person) => person.name))].sort((a, b) =>
      a.localeCompare(b),
    )
    const selectedSpeaker =
      requestedSpeaker && speakers.includes(requestedSpeaker) ? requestedSpeaker : 'all'
    const selectedPerson = speakerDocs.find((person) => person.name === selectedSpeaker)

    const result = await payload.find({
      collection: 'homilies',
      depth: 2,
      limit: 20,
      page,
      overrideAccess: false,
      sort: '-date',
      ...(selectedPerson ? { where: { speaker: { equals: selectedPerson.id } } } : {}),
    })

    return {
      docs: result.docs.map(toHomily),
      speakers,
      selectedSpeaker,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
      page: result.page || page,
      totalPages: result.totalPages,
    }
  },
)
