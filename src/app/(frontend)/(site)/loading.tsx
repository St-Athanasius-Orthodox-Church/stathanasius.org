import { Skeleton } from '@/components/ui/skeleton'

export default function SiteLoading() {
  return (
    <>
      <div className="relative h-[200px] overflow-hidden bg-byzantine-blue/10 md:h-[250px]">
        <Skeleton className="absolute inset-0 rounded-none" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
          <Skeleton className="h-10 w-64 max-w-full md:h-12 md:w-80" />
          <Skeleton className="h-6 w-48 max-w-full md:w-96" />
        </div>
      </div>

      <section className="container mx-auto max-w-4xl px-4 py-12">
        <Skeleton className="mb-8 h-8 w-56" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </section>
    </>
  )
}
