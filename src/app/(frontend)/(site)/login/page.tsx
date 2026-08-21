import type { Metadata } from 'next'
import { Suspense } from 'react'

import { Hero } from '@/components/ui/hero'

import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'Sign In | St. Athanasius Orthodox Church',
  description: 'Sign in to your St. Athanasius parish account.',
}

export default function LoginPage() {
  return (
    <Hero size="fullPage" gradientIntensity="strong">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </Hero>
  )
}
