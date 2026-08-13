import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const photoAlbums = await payload.find({
  collection: 'photo-albums',
})

await payload.create({
  collection: 'media',
  data: {},
})

console.log(photoAlbums)

process.exit(0)
