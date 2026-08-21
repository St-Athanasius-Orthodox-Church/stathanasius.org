import { User } from '@/payload-types'
import type { Endpoint } from 'payload'
import { APIError } from 'payload'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.email({ message: 'Valid email is required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  name: z.string().min(1).max(100).optional(),
})

export const registerEndpoint: Endpoint = {
  path: '/register',
  method: 'post',
  handler: async (req) => {
    let data: unknown
    try {
      data = await req.json?.()
      if (data === undefined) throw new Error('No body')
    } catch {
      throw new APIError('Invalid JSON body', 400)
    }

    const parsed = registerSchema.safeParse(data)

    if (!parsed.success) {
      throw new APIError(parsed.error.issues[0]?.message || 'Invalid input', 400)
    }

    const { email, password, name } = parsed.data
    let role: User['role'] = 'guest'
    const legacyAdmins = ['val@stathanasius.org', 'frsymeon@stathanasius.org']
    if (legacyAdmins.includes(email)) {
      role = 'admin'
    }
    const legacyEditors = ['dpdillon51@proton.me', 'ntinyayeva@gmail.com']
    if (legacyEditors.includes(email)) {
      role = 'editor'
    }

    try {
      const user = await req.payload.create({
        collection: 'users',
        data: {
          email,
          password,
          name,
          role,
        },
        overrideAccess: true,
      })

      // Return sanitized user - don't expose hash/salt
      return Response.json(
        {
          message: 'User registered successfully',
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        },
        { status: 201 },
      )
    } catch (err: unknown) {
      // Handle duplicate email from Payload's unique constraint
      const message = err instanceof Error ? err.message : 'Failed to create user'
      const isDuplicate =
        message.toLowerCase().includes('already exists') ||
        message.toLowerCase().includes('duplicate') ||
        message.toLowerCase().includes('unique')

      if (isDuplicate) {
        throw new APIError('A user with this email already exists', 409)
      }

      // Preserve APIError status if already one
      if (err instanceof APIError) throw err

      req.payload.logger.error({ err, msg: 'Register endpoint error' })
      throw new APIError(message, 400)
    }
  },
}
