import { Skeleton } from '@/components/dm/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col bg-background pb-[88px] lg:pb-4 text-foreground">
      {/* backdrop */}
      <Skeleton className="h-[180px] w-full" />

      {/* poster + title */}
      <div className="relative -mt-[70px] px-4">
        <div className="flex items-end gap-3.5">
          <Skeleton className="h-[150px] w-[106px] flex-shrink-0" />
          <div className="flex flex-col gap-2 pb-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-1 h-7 w-28" />
          </div>
        </div>
      </div>

      {/* plot */}
      <div className="mt-5 px-4">
        <Skeleton className="mb-2 h-4 w-20" />
        <Skeleton className="mb-1.5 h-3 w-full" />
        <Skeleton className="mb-1.5 h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>

      {/* review section header */}
      <div className="mt-6 px-4">
        <Skeleton className="mb-4 h-5 w-24" />
        <Skeleton className="mb-3 h-[88px] w-full" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="mb-3 h-[72px] w-full" />
        ))}
      </div>
    </div>
  )
}
