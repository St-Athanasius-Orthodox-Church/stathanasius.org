import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { getCookieExpiration, getPayload } from 'payload'

/**
 * Server-side helpers for managing the Payload auth cookie from Server Functions.
 *
 * The Payload Local API returns a token but never touches cookies, so these
 * helpers replicate exactly what Payload's REST auth endpoints set: an
 * httpOnly `<cookiePrefix>-token` cookie whose attributes come from the
 * normalized `users` collection auth config.
 */

export const AUTH_COOKIE_NAME = 'payload-token'

function toNextSameSite(sameSite: boolean | string | undefined): 'lax' | 'strict' | 'none' {
  if (typeof sameSite === 'string') {
    const normalized = sameSite.toLowerCase()
    if (normalized === 'lax' || normalized === 'strict' || normalized === 'none') {
      return normalized
    }
  }

  return 'lax'
}

export async function setAuthCookie(token: string): Promise<void> {
  const payload = await getPayload({ config: configPromise })
  const { auth: authConfig } = payload.collections.users.config

  const sameSite = toNextSameSite(authConfig.cookies.sameSite)

  await (await cookies()).set({
    name: `${payload.config.cookiePrefix}-token`,
    value: token,
    expires: getCookieExpiration({ seconds: authConfig.tokenExpiration }),
    httpOnly: true,
    path: '/',
    sameSite,
    secure: authConfig.cookies.secure || sameSite === 'none',
  })
}

export async function clearAuthCookie(): Promise<void> {
  await (await cookies()).delete(AUTH_COOKIE_NAME)
}
