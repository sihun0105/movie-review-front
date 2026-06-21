'use client'

import { DmMatchDetailCard } from '@/components/dm'
import { CreateMatchPostRequest, MatchApplication, MatchPost } from '@/lib/type'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useState } from 'react'
import { MatchFormSection } from '../../sections/match-form-section'
import { MatchApplicationRow } from './match-application-row'

interface MatchAuthorViewProps {
  matchPost: MatchPost
  applications: MatchApplication[]
  isDeleting: boolean
  isUpdating: boolean
  onUpdate: (_data: CreateMatchPostRequest) => Promise<void>
  onDelete: () => Promise<void>
  onApplicationStatusChange: (
    _applicationId: string,
    _status: 'accepted' | 'rejected',
  ) => Promise<void>
  mutateApplications: () => void
}

const MatchAuthorView: FunctionComponent<MatchAuthorViewProps> = ({
  matchPost,
  applications,
  isDeleting,
  isUpdating,
  onUpdate,
  onDelete,
  onApplicationStatusChange,
}) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 매치를 삭제하시겠습니까?')) return
    await onDelete()
  }

  const handleUpdate = async (data: CreateMatchPostRequest) => {
    await onUpdate(data)
    setIsEditing(false)
  }

  const initialData = {
    title: matchPost.title,
    content: matchPost.content,
    movieTitle: matchPost.movieTitle,
    theaterName: matchPost.theaterName,
    showTime: toDatetimeLocalValue(matchPost.showTime),
    maxParticipants: matchPost.maxParticipants,
    location: matchPost.location,
  }

  return (
    <div className="flex flex-col bg-background pb-4 text-foreground">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
        <button
          onClick={() => router.push('/match')}
          className="font-mono text-[11px] text-muted-foreground hover:text-primary"
        >
          ← 목록
        </button>
        <span className="font-mono text-[10px] text-muted-foreground">
          HOST VIEW
        </span>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          disabled={isUpdating}
          className="ml-auto border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-50"
        >
          {isEditing ? '닫기' : '수정'}
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="border border-primary/50 px-2.5 py-1 font-mono text-[11px] text-primary hover:bg-primary/10 disabled:opacity-50"
        >
          {isDeleting ? '삭제 중...' : '삭제'}
        </button>
      </div>

      {isEditing ? (
        <div className="px-4 py-5">
          <MatchFormSection
            initialData={initialData}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <DmMatchDetailCard match={matchPost} />
      )}

      <div className="mt-4 border-t border-border">
        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="font-dm-display text-[16px] italic text-foreground">
            신청 목록
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">
            {applications.length}명
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="py-10 text-center font-mono text-[12px] text-muted-foreground">
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

function toDatetimeLocalValue(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const offset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

export { MatchAuthorView }
