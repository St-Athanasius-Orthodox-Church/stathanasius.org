import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

import { revalidatePhotoAlbum, revalidatePhotoAlbumDelete } from './hooks/revalidatePhotoAlbum'

export const PhotoAlbums: CollectionConfig<'photo-albums'> = {
  slug: 'photo-albums',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'updatedAt'],
  },
  hooks: {
    afterChange: [revalidatePhotoAlbum],
    afterDelete: [revalidatePhotoAlbumDelete],
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
      name: 'coverPhoto',
      type: 'upload',
      relationTo: 'media',
      filterOptions: { mimeType: { contains: 'image' } },
      required: true,
    },
    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
  ],
}
