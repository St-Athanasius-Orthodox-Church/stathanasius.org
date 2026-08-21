import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type AdminOnly = (args: AccessArgs<User>) => boolean

export const adminOnly: AdminOnly = ({ req: { user } }) => {
  return user?.role === 'admin'
}
