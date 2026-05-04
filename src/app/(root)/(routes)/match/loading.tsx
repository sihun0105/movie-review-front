import { Skeleton } from '@/components/dm/skeleton'

export default function Loading() {
  return (
    <main className="min-h-page bg-dm-bg pb-5 text-dm-text">
      <div className="flex items-center border-b border-dm-line px-4 py-3.5">
        <h1 className="font-dm-display text-[20px] italic font-bold text-dm-text">
          같이 볼 사람
        </h1>
      </div>
      <div className="px-4 py-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="mb-3 border border-dm-line p-4">
            <div className="mb-2 flex items-center justify-between">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="mb-1.5 h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        ))}
      </div>
    </main>
  )
}
