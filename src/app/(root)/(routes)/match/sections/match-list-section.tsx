import { FunctionComponent, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { MatchCard } from '../components/match-card'
import { MatchApplyDialog } from '@/components/app/match-apply-dialog'

interface MatchListSectionProps {
  matchPosts: any[]
  isLoading: boolean
  hasMore: boolean
  loadMore: () => void
  selectedMatch: any
  showApplyDialog: boolean
  onApply: (_matchId: string) => void
  onApplySubmit: (_message: string) => Promise<void>
  onCloseApplyDialog: () => void
}

const MatchListSection: FunctionComponent<MatchListSectionProps> = ({
  matchPosts,
  isLoading,
  hasMore,
  loadMore,
  selectedMatch,
  showApplyDialog,
  onApply,
  onApplySubmit,
  onCloseApplyDialog,
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreElementRef = useRef<HTMLDivElement | null>(null)

  // Intersection Observer를 사용한 무한 스크롤 구현
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasMore && !isLoading) {
        loadMore()
      }
    },
    [hasMore, isLoading, loadMore],
  )

  useEffect(() => {
    const element = loadMoreElementRef.current
    if (!element) return

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    })

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver])

  if (isLoading && matchPosts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p>매치 게시글을 불러오는 중...</p>
      </div>
    )
  }

  if (matchPosts.length === 0 && !isLoading) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">아직 등록된 매치가 없습니다.</p>
        <p className="text-gray-500">첫 번째 매치를 등록해보세요!</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {matchPosts.map((match) => (
          <MatchCard key={match.id} matchPost={match} onApply={onApply} />
        ))}
      </div>

      {/* 무한 스크롤 트리거 영역 */}
      <div ref={loadMoreElementRef} className="py-4">
        {isLoading && matchPosts.length > 0 && (
          <div className="text-center">
            <p className="text-gray-500">더 많은 매치를 불러오는 중...</p>
          </div>
        )}
        {hasMore && !isLoading && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={loadMore}
              className="w-full max-w-xs"
            >
              더 많은 매치 보기
            </Button>
          </div>
        )}
        {!hasMore && matchPosts.length > 0 && (
          <div className="text-center">
            <p className="text-gray-500">모든 매치를 확인했습니다.</p>
          </div>
        )}
      </div>

      <MatchApplyDialog
        isOpen={showApplyDialog}
        onClose={onCloseApplyDialog}
        onApply={onApplySubmit}
        matchTitle={selectedMatch?.title || ''}
      />
    </>
  )
}

export { MatchListSection }
