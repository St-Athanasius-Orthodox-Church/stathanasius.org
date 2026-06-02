import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
import { MainLayout } from '@/layouts/main-layout'

import { FaqsAccordion } from './faqs-accordion'

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Frequently asked questions about St. Athanasius Orthodox Church and Orthodox Christianity.',
}

export default function Faqs() {
  return (
    <MainLayout>
      <Hero size="medium" title="Frequently Asked Questions" />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <FaqsAccordion />
      </section>
    </MainLayout>
  )
}
