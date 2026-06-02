import type { ReactNode } from 'react'

import { GoldSeparator } from '@/components/ui/gold-separator'
import { cn } from '@/lib/utils'

type SiteStatusPageProps = {
  title: string
  description: string
  actions?: ReactNode
  className?: string
}

export function SiteStatusPage({
  title,
  description,
  actions,
  className,
}: SiteStatusPageProps) {
  return (
    <section
      className={cn(
        'container mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center',
        className,
      )}
    >
      <div
        className="mb-6 h-0.5 w-16"
        style={{ background: 'var(--orthodox-gold)' }}
      />
      <h1 className="heading-orthodox font-cinzel text-3xl font-semibold text-byzantine-blue md:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-byzantine-blue/70">
        {description}
      </p>
      {actions ? (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {actions}
        </div>
      ) : null}
      <GoldSeparator className="mt-12 w-24 opacity-50" />
    </section>
  )
}
