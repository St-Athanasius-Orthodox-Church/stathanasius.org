import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { PhotoAlbum } from '../../../payload-types'

export const revalidatePhotoAlbum: CollectionAfterChangeHook<PhotoAlbum> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating photo albums at /photo-albums/${doc.id}`)

    revalidatePath('/photo-albums')
    revalidatePath(`/photo-albums/${doc.id}`)
  }

  return doc
}

export const revalidatePhotoAlbumDelete: CollectionAfterDeleteHook<PhotoAlbum> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/photo-albums')

    if (doc?.id) {
      revalidatePath(`/photo-albums/${doc.id}`)
    }
  }

  return doc
}
