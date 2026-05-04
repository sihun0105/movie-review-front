import { Skeleton } from '@/components/dm/skeleton'

export default function Loading() {
  return (
    <div className="min-h-page bg-background pb-[88px] text-foreground">
      {/* 헤더 */}
      <div className="flex items-center border-b border-border px-4 py-3.5">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="ml-auto h-8 w-16" />
      </div>

      {/* 매칭 정보 카드 */}
      <div className="border-b border-border px-4 py-5">
        <Skeleton className="mb-3 h-5 w-3/4" />
        <div className="flex flex-col gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-3 w-16 flex-shrink-0" />
              <Skeleton className="h-3 flex-1" />
            </div>
          ))}
        </div>
      </div>

      {/* 본문 */}
      <div className="border-b border-border px-4 py-4">
        <Skeleton className="mb-2 h-3 w-full" />
        <Skeleton className="mb-2 h-3 w-5/6" />
        <Skeleton className="h-3 w-3/4" />
      </div>

      {/* 참여 버튼 */}
      <div className="px-4 py-4">
        <Skeleton className="h-11 w-full" />
      </div>
    </div>
  )
}
