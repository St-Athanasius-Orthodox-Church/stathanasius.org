import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Homilies: CollectionConfig = {
  slug: 'homilies',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'date', 'speaker', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'speaker',
      type: 'relationship',
      relationTo: 'people',
      required: true,
    },
    {
      name: 'audio',
      type: 'upload',
      relationTo: 'audios',
      required: true,
    },
  ],
  timestamps: true,
}
