import type { Metadata } from 'next'
import { FileTextIcon } from 'lucide-react'

import { Hero } from '@/components/ui/hero'
import { bulletins, formatBulletinDate, type Bulletin } from '@/lib/bulletins'

export const metadata: Metadata = {
  title: 'Bulletins',
  description: 'Weekly parish bulletins from St. Athanasius Orthodox Church.',
}

function BulletinCard({ bulletin }: { bulletin: Bulletin }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-byzantine-blue/10 bg-white p-4 shadow-sm md:flex-row md:items-center md:gap-4">
      <div className="shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-orthodox-gold/30 bg-byzantine-blue/5 shadow-sm md:h-12 md:w-12">
          <FileTextIcon className="h-5 w-5 text-byzantine-blue/60 md:h-6 md:w-6" />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-byzantine-blue md:text-base">
          {formatBulletinDate(bulletin.date)}
        </p>
      </div>

      {bulletin.pdf_url && (
        <div className="w-full shrink-0 md:w-auto">
          <a
            href={bulletin.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-byzantine-blue px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-byzantine-blue/90 md:w-auto md:justify-start"
          >
            <FileTextIcon className="size-4" />
            View PDF
          </a>
        </div>
      )}
    </div>
  )
}

export default function BulletinsPage() {
  return (
    <>
      <Hero size="medium" title="Bulletins" />

      <section className="container mx-auto max-w-4xl px-4 py-12">
        {bulletins.length === 0 ? (
          <div className="py-12 text-center">
            <FileTextIcon className="mx-auto mb-4 h-12 w-12 text-byzantine-blue/30" />
            <p className="text-byzantine-blue/60">No bulletins available yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bulletins.map((bulletin) => (
              <BulletinCard key={bulletin.id} bulletin={bulletin} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
