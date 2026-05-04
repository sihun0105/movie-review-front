import { Skeleton } from '@/components/dm/skeleton'

export default function Loading() {
  return (
    <div className="min-h-page bg-background pb-[100px] text-foreground">
      <div className="flex items-center border-b border-border px-4 py-3.5">
        <h1 className="font-dm-display text-[20px] italic font-bold text-foreground">
          커뮤니티
        </h1>
      </div>
      <div className="px-4 py-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border-b border-border py-4">
            <Skeleton className="mb-2 h-4 w-3/4" />
            <Skeleton className="mb-2 h-3 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}
