import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig } from 'payload'

import { revalidatePath } from 'next/cache'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const revalidateBulletins: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating bulletins')

    revalidatePath('/')
    revalidatePath('/bulletins')
  }

  return doc
}

const revalidateBulletinsDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/')
    revalidatePath('/bulletins')
  }

  return doc
}

export const Bulletins: CollectionConfig = {
  slug: 'bulletins',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateBulletins],
    afterDelete: [revalidateBulletinsDelete],
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
