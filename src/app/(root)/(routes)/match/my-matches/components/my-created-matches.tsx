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
      <div className="py-12 text-center font-dm-mono text-[12px] text-dm-text-faint">
        작성한 매칭이 없습니다.
      </div>
    )

  return (
    <div>
      {matches.map((match) => (
        <div key={match.id} className="border-b border-dm-line px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <button
                onClick={() => router.push(`/match/${match.id}`)}
                className="text-left text-[14px] font-semibold text-dm-text hover:text-dm-amber"
              >
                {match.title}
              </button>
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 font-dm-mono text-[11px] text-dm-text-faint">
                <span>{match.movieTitle}</span>
                <span>{match.theaterName}</span>
                <span>
                  {match.currentParticipants}/{match.maxParticipants}명
                </span>
              </div>
              <div className="mt-1 font-dm-mono text-[10px] text-dm-text-faint">
                {new Date(match.createdAt).toLocaleDateString('ko-KR')}
              </div>
            </div>
            <button
              onClick={() => router.push(`/match/${match.id}`)}
              className="shrink-0 border border-dm-line px-2.5 py-1 font-dm-mono text-[11px] text-dm-text-faint hover:border-dm-amber hover:text-dm-amber"
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
