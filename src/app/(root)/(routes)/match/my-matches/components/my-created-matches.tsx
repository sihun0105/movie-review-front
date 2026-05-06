'use client'

import { MatchPost } from '@/lib/type'
import { useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'

interface MyCreatedMatchesProps {
  matches: MatchPost[]
}

const MyCreatedMatches: FunctionComponent<MyCreatedMatchesProps> = ({
  matches,
}) => {
  const router = useRouter()

  if (matches.length === 0)
    return (
      <div className="py-12 text-center font-mono text-[12px] text-muted-foreground">
        작성한 매칭이 없습니다.
      </div>
    )

  return (
    <div>
      {matches.map((match) => (
        <div key={match.id} className="border-b border-border px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <button
                onClick={() => router.push(`/match/${match.id}`)}
                className="text-left text-[14px] font-semibold text-foreground hover:text-primary"
              >
                {match.title}
              </button>
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[11px] text-muted-foreground">
                <span>{match.movieTitle}</span>
                <span>{match.theaterName}</span>
                <span>
                  {match.currentParticipants}/{match.maxParticipants}명
                </span>
              </div>
              <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                {new Date(match.createdAt).toLocaleDateString('ko-KR')}
              </div>
            </div>
            <button
              onClick={() => router.push(`/match/${match.id}`)}
              className="shrink-0 border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:border-primary hover:text-primary"
            >
              관리
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export { MyCreatedMatches }
