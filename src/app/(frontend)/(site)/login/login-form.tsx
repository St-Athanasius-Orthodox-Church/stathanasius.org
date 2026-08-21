'use client'

import { CircleCheckIcon, TriangleAlertIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'

import { loginAction } from '@/app/(frontend)/(site)/actions/auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

export function LoginForm() {
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered') === 'true'
  const [state, formAction, isPending] = useActionState(loginAction, {})

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

        <form action={formAction} className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email" className="text-byzantine-blue">
                Email
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
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
                name="password"
                type="password"
                placeholder="Your password"
                required
                autoComplete="current-password"
              />
            </Field>

            {state.error && (
              <Alert variant="destructive">
                <TriangleAlertIcon />
                <AlertTitle>Sign in failed</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              variant="byzantineGold"
              size="lg"
              className="w-full"
              disabled={isPending}
            >
              {isPending && <Spinner />}
              {isPending ? 'Signing in...' : 'Sign in'}
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
