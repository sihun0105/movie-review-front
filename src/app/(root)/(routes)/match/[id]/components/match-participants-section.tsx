import { DmUserAvatar, Skeleton } from '@/components/dm'
import { MatchParticipant } from '@/lib/type'
import Link from 'next/link'
import React from 'react'

interface MatchParticipantsSectionProps {
  participants: MatchParticipant[]
  isLoading: boolean
}

export function MatchParticipantsSection({
  participants,
  isLoading,
}: MatchParticipantsSectionProps) {
  if (isLoading) {
    return (
      <section
        role="status"
        aria-label="참여자 정보 로딩 중"
        className="border-t border-border px-4 py-5"
      >
        <Skeleton className="mb-4 h-5 w-32" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-16 rounded-md" />
          <Skeleton className="h-16 rounded-md" />
        </div>
      </section>
    )
  }
  if (participants.length === 0) return null

  return (
    <section className="border-t border-border px-4 py-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[16px] font-semibold text-foreground">
          함께 보는 사람들
        </h2>
        <span className="font-mono text-[11px] text-muted-foreground">
          {participants.length}명
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {participants.map((participant) => (
          <Link
            key={`${participant.role}-${participant.nickname}`}
            href={`/profile/${encodeURIComponent(participant.nickname)}`}
            className="flex min-w-0 items-center gap-2 rounded-md border border-border bg-card p-2.5 hover:border-primary"
          >
            <DmUserAvatar
              name={participant.nickname}
              image={participant.image}
              className="h-9 w-9"
            />
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium text-foreground">
                {participant.nickname}
              </span>
              <span className="block text-[10px] text-muted-foreground">
                {participant.role === 'host' ? '호스트' : '참여자'}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
