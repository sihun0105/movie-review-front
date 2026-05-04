'use client'

import { MatchPost } from '@/lib/type'
import { useRouter } from 'next/navigation'
import { Poster } from './poster'
import { paletteForMovie } from './poster-palette'

interface DmMatchTicketProps {
  match: MatchPost
}

const DOW = ['일', '월', '화', '수', '목', '금', '토']

function dDay(showTime: string): number {
  const target = new Date(showTime).getTime()
  const now = Date.now()
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24))
}

export function DmMatchTicket({ match }: DmMatchTicketProps) {
  const router = useRouter()
  const showTime = new Date(match.showTime)
  const month = String(showTime.getMonth() + 1).padStart(2, '0')
  const day = String(showTime.getDate()).padStart(2, '0')
  const dow = DOW[showTime.getDay()]
  const time = showTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const dd = dDay(match.showTime)
  const initial = match.author?.trim().charAt(0).toUpperCase() ?? '?'
  const isFull = match.currentParticipants >= match.maxParticipants
  const palette = paletteForMovie(match.id, match.movieTitle)

  return (
    <button
      type="button"
      onClick={() => router.push(`/match/${match.id}`)}
      className="w-full cursor-pointer rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-accent"
    >
      <div className="flex gap-3">
        {/* movie poster */}
        <div className="w-[50px] shrink-0">
          <Poster title={match.movieTitle} palette={palette} rounded="md" />
        </div>

        {/* body */}
        <div className="min-w-0 flex-1">
          {/* date + time + D-day */}
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[11px] text-muted-foreground">
              {month}.{day}({dow}) {time}
            </span>
            <span className={`ml-auto shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${isFull ? 'bg-muted text-muted-foreground' : 'border border-border text-muted-foreground'}`}>
              {dd <= 0 ? 'D-day' : `D-${dd}`}
            </span>
          </div>

          {/* movie title */}
          <div className="mt-1 truncate text-[13px] font-semibold text-foreground">
            {match.movieTitle}
          </div>

          {/* venue */}
          <div className="mt-0.5 truncate text-[11px] text-muted-foreground">
            {match.theaterName}
          </div>

          {/* host + capacity */}
          <div className="mt-1.5 flex items-center gap-1.5">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
              {initial}
            </div>
            <span className="text-[11px] text-muted-foreground">{match.author}</span>
            <span className="ml-auto font-mono text-[11px] text-muted-foreground">
              <span className={isFull ? 'text-muted-foreground' : 'text-foreground font-medium'}>
                {match.currentParticipants}
              </span>/{match.maxParticipants}명
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}
