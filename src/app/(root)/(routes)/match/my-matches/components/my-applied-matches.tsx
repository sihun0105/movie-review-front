'use client'

import { MatchApplication } from '@/lib/type'
import { useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'

const statusBadge: Record<string, { text: string; cls: string }> = {
  pending: { text: '대기', cls: 'text-muted-foreground border-border' },
  accepted: { text: '승인', cls: 'text-green-400 border-green-400/50' },
  rejected: { text: '거절', cls: 'text-primary border-primary/50' },
}

interface MyAppliedMatchesProps {
  applications: MatchApplication[]
  onCancel: (id: string) => void
}

const MyAppliedMatches: FunctionComponent<MyAppliedMatchesProps> = ({
  applications,
  onCancel,
}) => {
  const router = useRouter()

  if (applications.length === 0)
    return (
      <div className="py-12 text-center font-mono text-[12px] text-muted-foreground">
        신청한 매칭이 없습니다.
      </div>
    )

  return (
    <div>
      {applications.map((app) => {
        const badge = statusBadge[app.status] ?? statusBadge.pending
        return (
          <div key={app.id} className="border-b border-border px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push(`/match/${app.matchPostId}`)}
                    className="text-[14px] font-semibold text-foreground hover:text-primary"
                  >
                    매칭 상세보기 →
                  </button>
                  <span
                    className={`border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.5px] ${badge.cls}`}
                  >
                    {badge.text}
                  </span>
                </div>
                {app.message && (
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {app.message}
                  </p>
                )}
                <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                  {new Date(app.createdAt).toLocaleDateString('ko-KR')}
                </div>
              </div>
              {app.status === 'pending' && (
                <button
                  onClick={() => onCancel(app.id)}
                  className="shrink-0 border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:border-primary hover:text-primary"
                >
                  취소
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { MyAppliedMatches }
