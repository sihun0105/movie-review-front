'use client'

import { FunctionComponent, useEffect, useRef, useCallback, useState } from 'react'
import { useSession } from 'next-auth/react'
import { DmMatchTicket } from '@/components/dm'
import { MatchApplyDialog } from '@/components/app/match-apply-dialog'
import { cn } from '@/lib/utils'

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

const FILTERS = [
  { key: 'all',       label: '전체' },
  { key: 'available', label: '모집 중' },
  { key: 'week',      label: '이번 주' },
  { key: 'mine',      label: '내 매칭' },
] as const

type FilterKey = (typeof FILTERS)[number]['key']

function isThisWeek(showTime: string): boolean {
  const now = Date.now()
  const target = new Date(showTime).getTime()
  const sevenDays = 7 * 24 * 60 * 60 * 1000
  return target >= now && target <= now + sevenDays
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
  const { data: session } = useSession()
  const userId = session?.user?.id ? Number(session.user.id) : null
  const [filter, setFilter] = useState<FilterKey>('all')
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

  const filtered = matchPosts.filter(Boolean).filter((m) => {
    switch (filter) {
      case 'available': return m.currentParticipants < m.maxParticipants
      case 'week':      return isThisWeek(m.showTime)
      case 'mine':      return userId !== null && m.userno === userId
      default:          return true
    }
  })

  const emptyMessages: Record<FilterKey, { title: string; sub: string }> = {
    all:       { title: '아직 등록된 매치가 없습니다.', sub: '첫 번째 매치를 등록해보세요!' },
    available: { title: '모집 중인 매치가 없습니다.', sub: '잠시 후 다시 확인해보세요.' },
    week:      { title: '이번 주 예정된 매치가 없습니다.', sub: '직접 매치를 만들어보세요!' },
    mine:      { title: '내가 만든 매치가 없습니다.', sub: '첫 번째 매치를 만들어보세요!' },
  }

  if (isLoading && matchPosts.length === 0) {
    return (
      <div className="py-8 text-center font-mono text-[12px] text-muted-foreground">
        매치를 불러오는 중...
      </div>
    )
  }

  const { title: emptyTitle, sub: emptySub } = emptyMessages[filter]

  return (
    <>
      {/* 필터 탭 */}
      <div className="px-4 pt-4 pb-2">
        <div className="inline-flex rounded-md bg-muted p-1">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                'rounded px-3 py-1.5 text-[12px] font-medium transition-colors',
                filter === key
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && !isLoading ? (
        <div className="py-12 text-center text-muted-foreground">
          <p className="text-[14px]">{emptyTitle}</p>
          <p className="mt-1 text-[12px]">{emptySub}</p>
          {(filter === 'week' || filter === 'mine') && hasMore && (
            <button
              onClick={loadMore}
              className="mt-4 rounded-md border border-border px-4 py-2 font-mono text-[11px] text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              더 불러오기
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-4 py-2">
          {filtered.map((match) => (
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
      )}

      <div ref={loadMoreElementRef} className="py-4">
        {isLoading && matchPosts.length > 0 && (
          <div className="text-center font-mono text-[11px] text-muted-foreground">불러오는 중...</div>
        )}
        {!hasMore && filtered.length > 0 && (
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
