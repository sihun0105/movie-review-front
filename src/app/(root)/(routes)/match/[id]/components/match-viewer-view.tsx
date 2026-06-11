'use client'

import { MatchApplyDialog } from '@/components/app/match-apply-dialog'
import {
  DmMatchDetailCard,
  Poster,
  paletteForMovie,
  SectionHead,
} from '@/components/dm'
import { MatchPost } from '@/lib/type'
import { getMatchScheduleStatus } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useMyApplication } from '../../hooks/use-my-application'

interface MatchViewerViewProps {
  matchPost: MatchPost
  onApply: (_message: string) => Promise<void>
}

function ApplicationStatusBadge({ status }: { status: string }) {
  const map = {
    pending: { label: '신청 대기 중', className: 'border-border text-muted-foreground' },
    accepted: {
      label: '신청 승인됨',
      className: 'border-[#6fc96f] text-[#6fc96f]',
    },
    rejected: { label: '신청 거절됨', className: 'border-primary text-primary' },
  } as const
  const cfg = map[status as keyof typeof map]
  if (!cfg) return null
  return (
    <span
      className={`inline-block border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.5px] ${cfg.className}`}
    >
      {cfg.label}
    </span>
  )
}

const MatchViewerView = ({ matchPost, onApply }: MatchViewerViewProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { status } = useSession()
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const handledApplyIntentRef = useRef(false)
  const { application: myApplication, isLoading: isMyApplicationLoading } = useMyApplication(
    status === 'authenticated' ? matchPost.id : '',
  )
  const handleApplySubmit = async (message: string) => {
    await onApply(message)
    setShowApplyDialog(false)
  }
  const handleApplyClick = () => {
    if (status === 'unauthenticated') {
      router.push(
        `/login?callbackUrl=${encodeURIComponent(`/match/${matchPost.id}?intent=apply`)}`,
      )
      return
    }
    setShowApplyDialog(true)
  }
  const palette = paletteForMovie(matchPost.id, matchPost.movieTitle)
  const isFull = matchPost.currentParticipants >= matchPost.maxParticipants
  const isPast = getMatchScheduleStatus(matchPost.showTime).isPast
  const ctaLabel = isPast ? '지난 일정' : isFull ? '모집 완료' : '신청하기'

  useEffect(() => {
    if (handledApplyIntentRef.current) return
    if (searchParams?.get('intent') !== 'apply') return
    if (status !== 'authenticated' || isMyApplicationLoading) return
    if (isFull || isPast || myApplication) return

    handledApplyIntentRef.current = true
    setShowApplyDialog(true)
    router.replace(`/match/${matchPost.id}`)
  }, [
    isFull,
    isPast,
    isMyApplicationLoading,
    matchPost.id,
    myApplication,
    router,
    searchParams,
    status,
  ])

  return (
    <div className="relative min-h-page bg-background pb-6 text-foreground">
      <div className="sticky top-0 z-30 flex items-center border-b border-border bg-background/95 px-4 py-3.5 backdrop-blur-md">
        <button
          aria-label="뒤로"
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground"
        >
          <svg width="8" height="14" viewBox="0 0 8 14">
            <path
              d="M7 1L1 7l6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="flex-1 text-center text-[15px] font-semibold text-foreground">
          매칭 상세
        </div>
        <div className="w-[34px]" aria-hidden />
      </div>

      <section className="mx-4 mt-4 rounded-lg border border-border bg-card p-3.5 shadow-sm">
        <div className="flex gap-3">
          <div className="w-[72px] flex-shrink-0">
            <Poster title={matchPost.movieTitle} palette={palette} rounded="md" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-medium text-muted-foreground">
              관람 예정 작품
            </div>
            <div className="mt-1 break-keep text-[20px] font-semibold leading-tight text-foreground">
              {matchPost.movieTitle}
            </div>
            <div className="mt-2 break-keep text-[13px] leading-snug text-muted-foreground">
              {matchPost.title}
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 pb-6 pt-3">
        <DmMatchDetailCard match={matchPost} />

        {matchPost.content && (
          <div className="mt-4">
            <SectionHead className="mt-0">호스트의 인사</SectionHead>
            <div className="break-keep rounded-lg border border-border bg-card p-4 text-[14px] leading-[1.7] text-foreground">
              {matchPost.content}
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 z-40 mt-4 border-t border-border bg-background/95 px-4 pb-4 pt-3 backdrop-blur-md">
        {myApplication ? (
          <div className="flex flex-col items-center gap-2">
            <ApplicationStatusBadge status={myApplication.status} />
            {myApplication.status === 'accepted' && (
              <Link
                href={`/match/${matchPost.id}/chat/${matchPost.userno}`}
                className="block w-full bg-primary py-3.5 text-center text-[15px] font-bold tracking-[-0.01em] text-white"
              >
                작성자와 채팅하기
              </Link>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={handleApplyClick}
            disabled={isFull || isPast}
            className="w-full rounded-md bg-primary py-3.5 text-[15px] font-bold text-primary-foreground shadow-sm disabled:bg-secondary disabled:text-muted-foreground disabled:shadow-none"
          >
            {ctaLabel}
          </button>
        )}
      </div>

      <MatchApplyDialog
        isOpen={showApplyDialog}
        onClose={() => setShowApplyDialog(false)}
        onApply={handleApplySubmit}
        matchTitle={matchPost?.movieTitle || matchPost?.title || ''}
      />
    </div>
  )
}

export { MatchViewerView }
