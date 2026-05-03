import { FunctionComponent, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { DmMatchTicket } from '@/components/dm'
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
      <div className="py-8 text-center font-dm-mono text-[11px] text-dm-text-muted">
        매치를 불러오는 중...
      </div>
    )
  }

  if (matchPosts.length === 0 && !isLoading) {
    return (
      <div className="py-12 text-center text-dm-text-muted">
        <p>아직 등록된 매치가 없습니다.</p>
        <p className="mt-1 text-[12px] text-dm-text-faint">
          첫 번째 매치를 등록해보세요!
        </p>
      </div>
    )
  }

  const onTicketApply = (matchId: string) => onApply(matchId)

  return (
    <>
      <div className="flex flex-col gap-3.5 px-4 py-4">
        {matchPosts.filter(Boolean).map((match) => (
          <div key={match.id} className="relative">
            <DmMatchTicket match={match} />
            <button
              type="button"
              onClick={() => onTicketApply(match.id)}
              className="mt-1.5 w-full border border-dm-line-2 bg-dm-surface-2 py-2 text-[12px] font-semibold text-dm-text hover:border-dm-amber"
              disabled={
                match.currentParticipants >= match.maxParticipants
              }
            >
              {match.currentParticipants >= match.maxParticipants
                ? '모집완료'
                : '🎟 신청하기'}
            </button>
          </div>
        ))}
      </div>

      <div ref={loadMoreElementRef} className="py-4">
        {isLoading && matchPosts.length > 0 && (
          <div className="text-center font-dm-mono text-[11px] text-dm-text-muted">
            불러오는 중...
          </div>
        )}
        {hasMore && !isLoading && (
          <div className="px-4 text-center">
            <Button
              variant="outline"
              onClick={loadMore}
              className="w-full max-w-xs border-dm-line-2 bg-transparent text-dm-text hover:bg-dm-surface"
            >
              더 보기
            </Button>
          </div>
        )}
        {!hasMore && matchPosts.length > 0 && (
          <div className="text-center font-dm-mono text-[11px] text-dm-text-faint">
            — END —
          </div>
        )}
      </div>

      <MatchApplyDialog
        isOpen={showApplyDialog}
        onClose={onCloseApplyDialog}
        onApply={onApplySubmit}
        matchTitle={selectedMatch?.movieTitle || selectedMatch?.title || ''}
      />
    </>
  )
}

export { MatchListSection }
