import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating blog posts at /blog/${doc.slug}`)

    revalidatePath('/')
    revalidatePath('/blog')

    if (doc?.slug) {
      revalidatePath(`/blog/${doc.slug}`)
    }
  }

  return doc
}

export const revalidatePostDelete: CollectionAfterDeleteHook<Post> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/')
    revalidatePath('/blog')

    if (doc?.slug) {
      revalidatePath(`/blog/${doc.slug}`)
    }
  }

  return doc
}
