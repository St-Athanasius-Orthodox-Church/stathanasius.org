'use client'

import { CircleCheckIcon, TriangleAlertIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { FormEvent } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

export function RegisterForm() {
  const router = useRouter()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState(false)

  function setField<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(undefined)

    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (data.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name || undefined,
          email: data.email,
          password: data.password,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.errors?.[0]?.message || json.message || 'Registration failed')
      }

      // Auto-login after successful registration
      const loginRes = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })

      if (loginRes.ok) {
        setSuccess(true)
        // Give cookie time to set, then redirect
        setTimeout(() => router.push('/'), 800)
        return
      }

      // Registered but auto-login failed - redirect to login
      setSuccess(true)
      setTimeout(() => router.push('/login?registered=true'), 1200)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <Card variant="orthodox" goldBorderTop className="mx-auto w-full max-w-md gap-4 rounded-lg">
        <CardContent className="pt-6">
          <Alert variant="success">
            <CircleCheckIcon />
            <AlertTitle>Account created!</AlertTitle>
            <AlertDescription>Redirecting home...</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card variant="orthodox" goldBorderTop className="mx-auto w-full max-w-md gap-4 rounded-lg">
      <CardHeader className="pb-0 text-center">
        <CardTitle className="font-cinzel text-2xl font-semibold text-byzantine-blue md:text-3xl">
          Create Account
        </CardTitle>
        <CardDescription className="text-byzantine-blue/70">
          Join the St. Athanasius parish community
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name" className="text-byzantine-blue">
                Name <span className="text-muted-foreground">(optional)</span>
              </FieldLabel>
              <Input
                id="name"
                type="text"
                value={data.name}
                onChange={(e) => setField('name', e.target.value)}
                placeholder="John Doe"
                autoComplete="name"
              />
            </Field>

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
                placeholder="At least 8 characters"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword" className="text-byzantine-blue">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                value={data.confirmPassword}
                onChange={(e) => setField('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
              />
            </Field>

            {error && (
              <Alert variant="destructive">
                <TriangleAlertIcon />
                <AlertTitle>Registration failed</AlertTitle>
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
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>

            <p className="text-center text-sm text-byzantine-blue/70">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-orthodox-gold hover:underline">
                Sign in
              </Link>
            </p>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
