import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'

import { RegisterForm } from './register-form'

export const metadata: Metadata = {
  title: 'Create Account | St. Athanasius Orthodox Church',
  description: 'Create a guest account for St. Athanasius Orthodox Church.',
}

export default function RegisterPage() {
  return (
    <Hero size="fullPage" gradientIntensity="strong">
      <RegisterForm />
    </Hero>
  )
}
