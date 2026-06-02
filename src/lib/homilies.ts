export interface Homily {
  id: number
  title: string
  speaker: string
  date: string
  audio_url: string | null
  audio_download_url: string | null
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

export function formatHomilyDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

/** Populated when audio recordings are wired up from Payload. */
export const homilies: Homily[] = []

/** Distinct speaker names for the filter dropdown. */
export const homilySpeakers: string[] = []

export function filterHomiliesBySpeaker(
  items: Homily[],
  speaker: string | undefined,
): Homily[] {
  if (!speaker || speaker === 'all') {
    return items
  }

  return items.filter((homily) => homily.speaker === speaker)
}
