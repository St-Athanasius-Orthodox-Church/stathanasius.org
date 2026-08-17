import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { editorOrUp } from '../../access/editorOrUp'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: editorOrUp,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'guest',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Parishioner', value: 'parishioner' },
        { label: 'Guest', value: 'guest' },
      ],
      required: true,
      saveToJWT: true,
    },
  ],
  timestamps: true,
}
