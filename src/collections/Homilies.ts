import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from 'payload'

import { revalidatePath } from 'next/cache'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const revalidateHomilies: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating homilies')

    revalidatePath('/')
    revalidatePath('/homilies')
  }

  return doc
}

const revalidateHomiliesDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/')
    revalidatePath('/homilies')
  }

  return doc
}

export const Homilies: CollectionConfig = {
  slug: 'homilies',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateHomilies],
    afterDelete: [revalidateHomiliesDelete],
  },
  admin: {
    defaultColumns: ['title', 'date', 'speaker', 'updatedAt'],
    useAsTitle: 'title',
  },
  defaultSort: '-date',
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
      admin: {
        date: {
          displayFormat: 'MM/dd/yyyy',
        },
      },
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
