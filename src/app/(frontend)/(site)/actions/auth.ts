'use server'

import configPromise from '@payload-config'
import { APIError, getPayload } from 'payload'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import type { User } from '@/payload-types'

import { clearAuthCookie, setAuthCookie } from '@/lib/auth-cookies'

export type AuthFormState = {
  error?: string
}

const loginSchema = z.object({
  email: z.email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
})

const registerSchema = z.object({
  email: z.email({ message: 'Valid email is required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  name: z.string().min(1).max(100).optional(),
})

// Legacy accounts that predate the role field defaulting to 'guest'.
const LEGACY_ADMIN_EMAILS = ['val@stathanasius.org', 'frsymeon@stathanasius.org']
const LEGACY_EDITOR_EMAILS = ['dpdillon51@proton.me', 'ntinyayeva@gmail.com']

function resolveLegacyRole(email: string): User['role'] {
  if (LEGACY_ADMIN_EMAILS.includes(email)) return 'admin'
  if (LEGACY_EDITOR_EMAILS.includes(email)) return 'editor'
  return 'guest'
}

function isDuplicateEmailError(err: unknown): boolean {
  const message = err instanceof Error ? err.message.toLowerCase() : ''

  return (
    message.includes('already exists') ||
    message.includes('duplicate') ||
    message.includes('unique')
  )
}

function firstIssueMessage(error: z.ZodError): string {
  return error.issues[0]?.message ?? 'Invalid input'
}

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: String(formData.get('email') ?? '').trim(),
    password: String(formData.get('password') ?? ''),
  })

  if (!parsed.success) {
    return { error: firstIssueMessage(parsed.error) }
  }

  const payload = await getPayload({ config: configPromise })

  try {
    const result = await payload.login({
      collection: 'users',
      data: parsed.data,
    })

    if (!result.token) {
      throw new APIError('Login did not return a session token', 500)
    }

    await setAuthCookie(result.token)
  } catch (err) {
    if (err instanceof APIError) {
      return { error: err.message }
    }

    return { error: 'Invalid email or password.' }
  }

  redirect('/')
}

export async function registerAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const confirmPassword = String(formData.get('confirmPassword') ?? '')

  const parsed = registerSchema.safeParse({
    email: String(formData.get('email') ?? '').trim(),
    password: String(formData.get('password') ?? ''),
    name: String(formData.get('name') ?? '').trim() || undefined,
  })

  if (!parsed.success) {
    return { error: firstIssueMessage(parsed.error) }
  }

  if (parsed.data.password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  const payload = await getPayload({ config: configPromise })
  const { email, password, name } = parsed.data

  try {
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
        role: resolveLegacyRole(email),
      },
      overrideAccess: true,
    })
  } catch (err) {
    if (isDuplicateEmailError(err)) {
      return { error: 'A user with this email already exists' }
    }

    payload.logger.error({ err, msg: 'Register action error' })
    return { error: 'Unable to create your account. Please try again.' }
  }

  // Auto-login after successful registration.
  try {
    const result = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    if (!result.token) {
      throw new APIError('Login did not return a session token', 500)
    }

    await setAuthCookie(result.token)
  } catch {
    // Registered but auto-login failed - send them to sign in.
    redirect('/login?registered=true')
  }

  redirect('/')
}

export async function logoutAction(): Promise<void> {
  await clearAuthCookie()
  redirect('/')
}
