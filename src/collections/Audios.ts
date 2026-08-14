import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Audios: CollectionConfig = {
  slug: 'audios',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['filename', 'mimeType', 'updatedAt'],
    useAsTitle: 'filename',
    hidden: true,
  },
  upload: {
    mimeTypes: ['audio/*'],
    staticDir: path.resolve(dirname, '../../public/audios'),
  },
  fields: [],
}
