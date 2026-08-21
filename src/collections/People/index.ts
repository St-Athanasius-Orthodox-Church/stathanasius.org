import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { defaultLexical } from '../../fields/defaultLexical'

export const People: CollectionConfig = {
  slug: 'people',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'title', 'updatedAt'],
    hidden: ({ user }) => user?.role !== 'admin',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      filterOptions: { mimeType: { contains: 'image' } },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Role or position, e.g. "Pastor" or "Guest Preacher".',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Link to a CMS user account, if this person has one.',
      },
    },
  ],
  timestamps: true,
}
