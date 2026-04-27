'use client'

import { MatchPost } from '@/lib/type'
import { useRouter } from 'next/navigation'
import { Pill } from './pill'

interface DmMatchTicketProps {
  match: MatchPost
}

const DOW = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function ticketSerial(match: MatchPost): string {
  const showTime = new Date(match.showTime)
  const mm = String(showTime.getMonth() + 1).padStart(2, '0')
  const dd = String(showTime.getDate()).padStart(2, '0')
  const idShort = String(match.id).slice(0, 5).toUpperCase().padStart(5, '0')
  return `DM-${idShort}-${mm}${dd}`
}

function dDay(showTime: string): number {
  const target = new Date(showTime).getTime()
  const now = Date.now()
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24))
}

export function DmMatchTicket({ match }: DmMatchTicketProps) {
  const router = useRouter()
  const showTime = new Date(match.showTime)
  const day = String(showTime.getDate()).padStart(2, '0')
  const dow = DOW[showTime.getDay()]
  const time = showTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const dd = dDay(match.showTime)
  const initial = match.author?.trim().charAt(0).toUpperCase() ?? '?'
  const tags: string[] = []
  if (match.gender === 'male') tags.push('남성만')
  else if (match.gender === 'female') tags.push('여성만')

  return (
    <button
      type="button"
      onClick={() => router.push(`/match/${match.id}`)}
      className="relative grid w-full cursor-pointer grid-cols-[62px_1fr_56px] border border-dm-line-2 bg-dm-surface text-left shadow-[0_2px_0_rgba(0,0,0,0.3)]"
    >
      {/* punch holes */}
      <span
        aria-hidden
        className="absolute left-[-9px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-dm-line-2 bg-dm-bg shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"
      />
      <span
        aria-hidden
        className="absolute right-[-9px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-dm-line-2 bg-dm-bg shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]"
      />

      {/* date stub */}
      <div
        className="border-r border-dashed border-dm-line-2 px-1 pb-2.5 pt-3.5 text-center"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(192,48,40,0.05) 100%)',
        }}
      >
        <div className="font-dm-rank text-[28px] leading-none text-dm-amber">
          {day}
        </div>
        <div className="mt-0.5 font-dm-mono text-[9px] tracking-[0.5px] text-dm-text-muted">
          {dow}
        </div>
        <div className="mt-1.5 font-dm-mono text-[11px] text-dm-text">
          {time}
        </div>
        <div
          className="mt-2 h-4 opacity-55"
          style={{
            background:
              'repeating-linear-gradient(90deg, var(--dm-text) 0 1px, transparent 1px 2px, var(--dm-text) 2px 4px, transparent 4px 5px, var(--dm-text) 5px 7px, transparent 7px 9px)',
          }}
          aria-hidden
        />
      </div>

      {/* body */}
      <div className="min-w-0 px-3 py-2.5">
        <div className="mb-0.5 font-dm-mono text-[8px] tracking-[0.5px] text-dm-text-faint">
          {ticketSerial(match)}
        </div>
        <div className="truncate font-dm-display text-[13px] italic font-semibold text-dm-text">
          {match.movieTitle}
        </div>
        <div className="mt-1 truncate text-[11px] text-dm-text-muted">
          📍 {match.theaterName}
        </div>
        <div className="mt-0.5 text-[11px] text-dm-text-muted">
          👥{' '}
          <span className="font-semibold text-dm-amber">
            {match.currentParticipants}
          </span>
          <span className="text-dm-text-faint">
            /{match.maxParticipants}명
          </span>
          <span className="ml-1.5 font-dm-mono text-[10px] text-dm-red">
            D-{dd >= 0 ? dd : 0}
          </span>
        </div>
        {tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {tags.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        )}
      </div>

      {/* host */}
      <div className="flex min-w-0 flex-col items-center justify-center border-l border-dashed border-dm-line-2 px-1 py-2.5 text-center">
        <div className="font-dm-mono text-[8px] tracking-[0.5px] text-dm-text-faint">
          HOST
        </div>
        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-dm-line-2 bg-dm-surface-2 text-[13px] font-bold text-dm-text">
          {initial}
        </div>
        <div className="mt-1 max-w-[54px] truncate font-dm-mono text-[9px] text-dm-text">
          @{match.author}
        </div>
      </div>
    </button>
  )
}
