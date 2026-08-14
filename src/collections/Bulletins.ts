import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Bulletins: CollectionConfig = {
  slug: 'bulletins',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['date', 'updatedAt'],
  },
  defaultSort: '-date',
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          displayFormat: 'MM/dd/yyyy',
        },
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'files',
      required: true,
    },
  ],
  timestamps: true,
}
