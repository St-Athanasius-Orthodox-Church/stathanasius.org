'use client'

import { TriangleAlertIcon } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'

import { registerAction } from '@/app/(frontend)/(site)/actions/auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, {})

  return (
    <Card variant="orthodox" goldBorderTop className="mx-auto w-full max-w-md gap-4 rounded-lg">
      <CardHeader className="pb-0 text-center">
        <CardTitle className="font-cinzel text-2xl font-semibold text-byzantine-blue md:text-3xl">
          Create Account
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name" className="text-byzantine-blue">
                Name <span className="text-muted-foreground">(optional)</span>
              </FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                maxLength={100}
              />
            </Field>

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
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
              />
            </Field>

            {state.error && (
              <Alert variant="destructive">
                <TriangleAlertIcon />
                <AlertTitle>Registration failed</AlertTitle>
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
              {isPending ? 'Creating account...' : 'Create account'}
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
