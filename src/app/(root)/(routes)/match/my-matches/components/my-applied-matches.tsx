'use client'

import { MatchApplication } from '@/lib/type'
import { useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'

const statusBadge: Record<string, { text: string; cls: string }> = {
  pending: { text: '대기', cls: 'text-dm-amber border-dm-amber/50' },
  accepted: { text: '승인', cls: 'text-green-400 border-green-400/50' },
  rejected: { text: '거절', cls: 'text-dm-red border-dm-red/50' },
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
      <div className="py-12 text-center font-dm-mono text-[12px] text-dm-text-faint">
        신청한 매칭이 없습니다.
      </div>
    )

  return (
    <div>
      {applications.map((app) => {
        const badge = statusBadge[app.status] ?? statusBadge.pending
        return (
          <div key={app.id} className="border-b border-dm-line px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => router.push(`/match/${app.matchPostId}`)}
                    className="text-[14px] font-semibold text-dm-text hover:text-dm-amber"
                  >
                    매칭 상세보기 →
                  </button>
                  <span
                    className={`border px-1.5 py-0.5 font-dm-mono text-[9px] uppercase tracking-[0.5px] ${badge.cls}`}
                  >
                    {badge.text}
                  </span>
                </div>
                {app.message && (
                  <p className="mt-1 text-[13px] text-dm-text-muted">
                    {app.message}
                  </p>
                )}
                <div className="mt-1 font-dm-mono text-[10px] text-dm-text-faint">
                  {new Date(app.createdAt).toLocaleDateString('ko-KR')}
                </div>
              </div>
              {app.status === 'pending' && (
                <button
                  onClick={() => onCancel(app.id)}
                  className="shrink-0 border border-dm-line px-2.5 py-1 font-dm-mono text-[11px] text-dm-text-faint hover:border-dm-red hover:text-dm-red"
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
