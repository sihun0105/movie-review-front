'use client'

import { MatchApplyDialog } from '@/components/app/match-apply-dialog'
import {
  DmMatchDetailCard,
  Poster,
  paletteForMovie,
  SectionHead,
} from '@/components/dm'
import { MatchPost } from '@/lib/type'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMyApplication } from '../../hooks/use-my-application'

interface MatchViewerViewProps {
  matchPost: MatchPost
  onApply: (_message: string) => Promise<void>
}

function ApplicationStatusBadge({ status }: { status: string }) {
  const map = {
    pending: { label: '신청 대기 중', className: 'border-dm-amber text-dm-amber' },
    accepted: {
      label: '신청 승인됨',
      className: 'border-[#6fc96f] text-[#6fc96f]',
    },
    rejected: { label: '신청 거절됨', className: 'border-dm-red text-dm-red' },
  } as const
  const cfg = map[status as keyof typeof map]
  if (!cfg) return null
  return (
    <span
      className={`inline-block border px-3 py-1.5 font-dm-mono text-[11px] uppercase tracking-[0.5px] ${cfg.className}`}
    >
      {cfg.label}
    </span>
  )
}

const MatchViewerView = ({ matchPost, onApply }: MatchViewerViewProps) => {
  const router = useRouter()
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const { application: myApplication } = useMyApplication(matchPost.id)
  const handleApplySubmit = async (message: string) => {
    await onApply(message)
    setShowApplyDialog(false)
  }
  const palette = paletteForMovie(matchPost.id, matchPost.movieTitle)
  const isFull = matchPost.currentParticipants >= matchPost.maxParticipants

  return (
    <main className="relative min-h-page bg-dm-bg pb-[140px] text-dm-text">
      <div className="flex items-center border-b border-dm-line px-4 py-3.5">
        <button
          aria-label="뒤로"
          onClick={() => router.back()}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/[0.06] text-dm-text"
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
        <div className="flex-1 text-center font-dm-display text-[17px] italic font-bold text-dm-text">
          매칭 상세
        </div>
        <div className="w-[34px]" aria-hidden />
      </div>

      <div className="flex gap-2.5 border-b border-dm-line px-4 py-4">
        <div className="w-[60px] flex-shrink-0">
          <Poster title={matchPost.movieTitle} palette={palette} />
        </div>
        <div className="min-w-0">
          <div className="font-dm-mono text-[10px] uppercase tracking-[0.5px] text-dm-text-muted">
            관람 예정 작품
          </div>
          <div className="mt-0.5 font-dm-display text-[18px] italic text-dm-text">
            {matchPost.movieTitle}
          </div>
          <div className="mt-1 break-keep text-[11px] text-dm-text-muted">
            {matchPost.title}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <DmMatchDetailCard match={matchPost} />

        {matchPost.content && (
          <div className="mt-4">
            <SectionHead>호스트의 인사</SectionHead>
            <div className="break-keep border border-dm-line bg-dm-surface p-3.5 font-dm-display text-[14px] italic leading-[1.6] text-dm-text">
              &ldquo;{matchPost.content}&rdquo;
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-[72px] left-1/2 z-25 w-full max-w-[460px] -translate-x-1/2 border-t border-dm-line bg-dm-bg/95 px-3 py-3 backdrop-blur-md">
        {myApplication ? (
          <div className="flex flex-col items-center gap-2">
            <ApplicationStatusBadge status={myApplication.status} />
            {myApplication.status === 'accepted' && (
              <Link
                href={`/match/${matchPost.id}/chat/${matchPost.userno}`}
                className="block w-full bg-dm-red py-3.5 text-center text-[15px] font-bold tracking-[-0.01em] text-white"
              >
                작성자와 채팅하기
              </Link>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowApplyDialog(true)}
            disabled={isFull}
            className="w-full bg-dm-red py-3.5 text-[15px] font-bold tracking-[-0.01em] text-white shadow-[0_0_0_1px_var(--dm-line-2),0_6px_20px_-8px_var(--dm-red)] disabled:bg-dm-surface-2 disabled:text-dm-text-faint disabled:shadow-none"
          >
            {isFull ? '모집 완료' : '🎟  신청하기'}
          </button>
        )}
      </div>

      <MatchApplyDialog
        isOpen={showApplyDialog}
        onClose={() => setShowApplyDialog(false)}
        onApply={handleApplySubmit}
        matchTitle={matchPost?.movieTitle || matchPost?.title || ''}
      />
    </main>
  )
}

export { MatchViewerView }
