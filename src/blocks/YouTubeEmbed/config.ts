import type { Block } from 'payload'

import { getYouTubeVideoId } from '@/utilities/getYouTubeVideoId'

export const YouTubeEmbed: Block = {
  slug: 'youtubeEmbed',
  interfaceName: 'YouTubeEmbedBlock',
  labels: {
    plural: 'YouTube Videos',
    singular: 'YouTube Video',
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      admin: {
        description: 'Paste a YouTube video URL, such as https://www.youtube.com/watch?v=...',
      },
      required: true,
      validate: (value: unknown) => {
        if (typeof value !== 'string' || !getYouTubeVideoId(value)) {
          return 'Enter a valid YouTube video URL'
        }

        return true
      },
    },
  ],
}
