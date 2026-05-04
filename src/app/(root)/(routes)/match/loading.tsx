import { Skeleton } from '@/components/dm/skeleton'

export default function Loading() {
  return (
    <main className="min-h-page bg-background pb-5 text-foreground">
      <div className="flex items-center border-b border-border px-4 py-3.5">
        <h1 className="font-dm-display text-[20px] italic font-bold text-foreground">
          같이 볼 사람
        </h1>
      </div>
      <div className="flex flex-col gap-3 px-4 py-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-3">
            <div className="flex gap-3">
              <Skeleton className="h-[75px] w-[50px] rounded" />
              <div className="flex-1 space-y-2 pt-0.5">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-2/5" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
