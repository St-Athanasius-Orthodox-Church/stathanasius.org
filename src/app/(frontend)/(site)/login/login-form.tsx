'use client'

import { CircleCheckIcon, TriangleAlertIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import type { FormEvent } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered') === 'true'
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>()

  function setField<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(undefined)
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.errors?.[0]?.message || json.message || 'Login failed')
      }

      router.push('/')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <Card variant="orthodox" goldBorderTop className="mx-auto w-full max-w-md gap-4 rounded-lg">
      <CardHeader className="pb-0 text-center">
        <CardTitle className="font-cinzel text-2xl font-semibold text-byzantine-blue md:text-3xl">
          Sign In
        </CardTitle>
      </CardHeader>

      <CardContent>
        {registered && (
          <Alert variant="success" className="mb-6">
            <CircleCheckIcon />
            <AlertTitle>Account created!</AlertTitle>
            <AlertDescription>Please sign in with your new credentials.</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email" className="text-byzantine-blue">
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setField('email', e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password" className="text-byzantine-blue">
                Password
              </FieldLabel>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setField('password', e.target.value)}
                placeholder="Your password"
                required
                autoComplete="current-password"
              />
            </Field>

            {error && (
              <Alert variant="destructive">
                <TriangleAlertIcon />
                <AlertTitle>Sign in failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              variant="byzantineGold"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting && <Spinner />}
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>

            <p className="text-center text-sm text-byzantine-blue/70">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold text-orthodox-gold hover:underline">
                Create account
              </Link>
            </p>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
