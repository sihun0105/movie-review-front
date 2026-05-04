'use client'

import { MatchApplication } from '@/lib/type'
import { FunctionComponent } from 'react'

const statusLabel: Record<string, { text: string; cls: string }> = {
  pending: { text: '대기', cls: 'text-yellow-400 border-yellow-400/50 bg-dm-amber/10' },
  accepted: { text: '승인', cls: 'text-green-400 border-green-400/50 bg-green-400/10' },
  rejected: { text: '거절', cls: 'text-primary border-primary/50 bg-primary/10' },
}

interface MatchApplicationRowProps {
  application: MatchApplication
  onAccept?: () => void
  onReject?: () => void
  onChat?: () => void
}

const MatchApplicationRow: FunctionComponent<MatchApplicationRowProps> = ({
  application,
  onAccept,
  onReject,
  onChat,
}) => {
  const badge = statusLabel[application.status] ?? statusLabel.pending

  return (
    <div className="border-b border-border px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-foreground">
              {application.applicantName}
            </span>
            <span
              className={`border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.5px] ${badge.cls}`}
            >
              {badge.text}
            </span>
          </div>
          {application.message && (
            <p className="mt-1 text-[13px] text-muted-foreground">
              {application.message}
            </p>
          )}
          <div className="mt-1 font-mono text-[10px] text-muted-foreground">
            {new Date(application.createdAt).toLocaleDateString('ko-KR')}
          </div>
        </div>

        <div className="flex shrink-0 gap-1.5">
          {application.status === 'pending' && (
            <>
              <button
                onClick={onAccept}
                className="border border-green-500/50 px-2.5 py-1 font-mono text-[11px] text-green-400 hover:bg-green-400/10"
              >
                승인
              </button>
              <button
                onClick={onReject}
                className="border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:border-primary hover:text-primary"
              >
                거절
              </button>
            </>
          )}
          {application.status === 'accepted' && (
            <button
              onClick={onChat}
              className="border border-yellow-400/50 px-2.5 py-1 font-mono text-[11px] text-yellow-400 hover:bg-dm-amber/10"
            >
              채팅 →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export { MatchApplicationRow }
