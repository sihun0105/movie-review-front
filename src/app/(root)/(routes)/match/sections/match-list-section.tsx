import { FunctionComponent, useEffect, useRef, useCallback } from 'react'
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

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasMore && !isLoading) loadMore()
    },
    [hasMore, isLoading, loadMore],
  )

  useEffect(() => {
    const element = loadMoreElementRef.current
    if (!element) return
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(handleObserver, { threshold: 0.1 })
    observerRef.current.observe(element)
    return () => observerRef.current?.disconnect()
  }, [handleObserver])

  if (isLoading && matchPosts.length === 0) {
    return (
      <div className="py-8 text-center font-mono text-[12px] text-muted-foreground">
        매치를 불러오는 중...
      </div>
    )
  }

  if (matchPosts.length === 0 && !isLoading) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <p className="text-[14px]">아직 등록된 매치가 없습니다.</p>
        <p className="mt-1 text-[12px]">첫 번째 매치를 등록해보세요!</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-3 px-4 py-3">
        {matchPosts.filter(Boolean).map((match) => (
          <div key={match.id}>
            <DmMatchTicket match={match} />
            <button
              type="button"
              onClick={() => onApply(match.id)}
              disabled={match.currentParticipants >= match.maxParticipants}
              className="mt-2 h-9 w-full rounded-md border border-border text-[13px] font-medium text-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              {match.currentParticipants >= match.maxParticipants ? '모집완료' : '신청하기'}
            </button>
          </div>
        ))}
      </div>

      <div ref={loadMoreElementRef} className="py-4">
        {isLoading && matchPosts.length > 0 && (
          <div className="text-center font-mono text-[11px] text-muted-foreground">불러오는 중...</div>
        )}
        {!hasMore && matchPosts.length > 0 && (
          <div className="text-center font-mono text-[11px] text-muted-foreground">— 끝 —</div>
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
