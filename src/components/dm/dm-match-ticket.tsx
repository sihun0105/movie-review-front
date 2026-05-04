'use client'

import { MatchPost } from '@/lib/type'
import { useRouter } from 'next/navigation'

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

  return (
    <button
      type="button"
      onClick={() => router.push(`/match/${match.id}`)}
      className="w-full cursor-pointer rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-accent"
    >
      <div className="flex items-center gap-3">
        {/* poster/date stub */}
        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-md bg-secondary text-center">
          <div className="font-mono text-[18px] font-bold leading-none text-foreground">{day}</div>
          <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{month}월 {dow}요일</div>
        </div>

        {/* body */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-[13px] font-semibold text-foreground">{match.movieTitle}</span>
            <span className={`ml-auto shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${isFull ? 'bg-muted text-muted-foreground' : 'border border-border text-muted-foreground'}`}>
              D-{dd >= 0 ? dd : 0}
            </span>
          </div>
          <div className="mt-0.5 truncate text-[11px] text-muted-foreground">
            📍 {match.theaterName}
          </div>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
            <span>{time}</span>
            <span className="font-mono">
              👥 <span className="text-foreground font-medium">{match.currentParticipants}</span>/{match.maxParticipants}명
            </span>
            <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
              {initial}
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
