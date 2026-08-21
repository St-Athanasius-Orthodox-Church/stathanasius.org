import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'

import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'Sign In | St. Athanasius Orthodox Church',
  description: 'Sign in to your St. Athanasius parish account.',
}

type LoginPageProps = {
  searchParams: Promise<{ registered?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { registered } = await searchParams

  return (
    <Hero size="fullPage" gradientIntensity="strong">
      <LoginForm registered={registered === 'true'} />
    </Hero>
  )
}
