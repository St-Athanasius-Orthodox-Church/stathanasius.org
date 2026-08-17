import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type EditorOrUp = (args: AccessArgs<User>) => boolean

export const editorOrUp: EditorOrUp = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'editor'
}
