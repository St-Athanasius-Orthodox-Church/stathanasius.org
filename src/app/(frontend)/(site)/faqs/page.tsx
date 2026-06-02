import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
import { FaqsAccordion } from './faqs-accordion'

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Frequently asked questions about St. Athanasius Orthodox Church and Orthodox Christianity.',
}

export default function Faqs() {
  return (
    <>
      <Hero size="medium" title="Frequently Asked Questions" />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <FaqsAccordion />
      </section>
    </>
  )
}
