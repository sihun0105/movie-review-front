import { Skeleton } from '@/components/dm/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col bg-dm-bg pb-[140px] text-dm-text">
      {/* 헤더 */}
      <div className="border-b border-dm-line px-4 py-3.5">
        <Skeleton className="h-4 w-12" />
      </div>

      {/* 아티클 본문 */}
      <div className="px-4 py-5">
        <Skeleton className="mb-2 h-3 w-28" />
        <Skeleton className="mb-4 h-6 w-3/4" />
        <Skeleton className="mb-1.5 h-3 w-full" />
        <Skeleton className="mb-1.5 h-3 w-full" />
        <Skeleton className="mb-1.5 h-3 w-5/6" />
        <Skeleton className="mb-1.5 h-3 w-4/5" />
        <Skeleton className="h-3 w-2/3" />
      </div>

      {/* 좋아요 영역 */}
      <div className="border-y border-dm-line px-4 py-3">
        <Skeleton className="h-8 w-32" />
      </div>

      {/* 댓글 섹션 */}
      <div className="px-4 py-4">
        <Skeleton className="mb-4 h-5 w-20" />
        <Skeleton className="mb-3 h-[72px] w-full" />
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="mb-3 h-[60px] w-full" />
        ))}
      </div>
    </div>
  )
}
