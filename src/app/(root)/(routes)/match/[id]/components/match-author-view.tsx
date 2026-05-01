'use client'

import { DmMatchDetailCard } from '@/components/dm'
import { MatchApplication, MatchPost } from '@/lib/type'
import { useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'
import { MatchApplicationRow } from './match-application-row'

interface MatchAuthorViewProps {
  matchPost: MatchPost
  applications: MatchApplication[]
  isDeleting: boolean
  onDelete: () => Promise<void>
  onApplicationStatusChange: (
    applicationId: string,
    status: 'accepted' | 'rejected',
  ) => Promise<void>
  mutateApplications: () => void
}

const MatchAuthorView: FunctionComponent<MatchAuthorViewProps> = ({
  matchPost,
  applications,
  isDeleting,
  onDelete,
  onApplicationStatusChange,
}) => {
  const router = useRouter()

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 매치를 삭제하시겠습니까?')) return
    await onDelete()
  }

  return (
    <div className="flex flex-col bg-dm-bg pb-[100px] text-dm-text">
      <div className="flex items-center gap-3 border-b border-dm-line px-4 py-3.5">
        <button
          onClick={() => router.push('/match')}
          className="font-dm-mono text-[11px] text-dm-text-faint hover:text-dm-amber"
        >
          ← 목록
        </button>
        <span className="font-dm-mono text-[10px] text-dm-text-faint">
          HOST VIEW
        </span>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="ml-auto border border-dm-red/50 px-2.5 py-1 font-dm-mono text-[11px] text-dm-red hover:bg-dm-red/10 disabled:opacity-50"
        >
          {isDeleting ? '삭제 중...' : '삭제'}
        </button>
      </div>

      <DmMatchDetailCard match={matchPost} />

      <div className="mt-4 border-t border-dm-line">
        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="font-dm-display text-[16px] italic text-dm-text">
            신청 목록
          </span>
          <span className="font-dm-mono text-[11px] text-dm-text-faint">
            {applications.length}명
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="py-10 text-center font-dm-mono text-[12px] text-dm-text-faint">
            아직 신청자가 없습니다.
          </div>
        ) : (
          applications.map((app) => (
            <MatchApplicationRow
              key={app.id}
              application={app}
              onAccept={() => onApplicationStatusChange(app.id, 'accepted')}
              onReject={() => onApplicationStatusChange(app.id, 'rejected')}
              onChat={() =>
                router.push(
                  `/match/${matchPost.id}/chat/${app.applicantUserno}`,
                )
              }
            />
          ))
        )}
      </div>
    </div>
  )
}

export { MatchAuthorView }
