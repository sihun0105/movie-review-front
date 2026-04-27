import { MatchPost } from '@/lib/type'
import { Pill } from './pill'

interface DmMatchDetailCardProps {
  match: MatchPost
}

const DOW = ['일', '월', '화', '수', '목', '금', '토']

function dDay(showTime: string): number {
  const target = new Date(showTime).getTime()
  return Math.ceil((target - Date.now()) / (1000 * 60 * 60 * 24))
}

function FilmStrip({ position }: { position: 'top' | 'bottom' }) {
  return (
    <div
      aria-hidden
      className={`-mx-[18px] h-3 ${
        position === 'top'
          ? '-mt-[18px] mb-3.5 border-b border-dm-line-2'
          : 'mt-3.5 -mb-[18px] border-t border-dm-line-2'
      }`}
      style={{
        background:
          'repeating-linear-gradient(90deg, #000 0 12px, transparent 12px 16px, #000 16px 28px, transparent 28px 32px)',
      }}
    />
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-dm-mono text-[10px] uppercase tracking-[1px] text-dm-text-muted">
      {children}
    </div>
  )
}

function DashedDivider() {
  return (
    <div
      className="my-3.5 border-t border-dashed border-dm-line-2"
      aria-hidden
    />
  )
}

export function DmMatchDetailCard({ match }: DmMatchDetailCardProps) {
  const showTime = new Date(match.showTime)
  const m = String(showTime.getMonth() + 1).padStart(2, '0')
  const d = String(showTime.getDate()).padStart(2, '0')
  const dow = DOW[showTime.getDay()]
  const time = showTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const dd = dDay(match.showTime)
  const tags: string[] = []
  if (match.gender === 'male') tags.push('남성만')
  else if (match.gender === 'female') tags.push('여성만')
  const joined = match.currentParticipants
  const cap = match.maxParticipants
  const emptyCount = Math.max(0, cap - joined)

  return (
    <div
      className="relative border border-dm-line-2 p-[18px]"
      style={{
        background: 'linear-gradient(180deg, var(--dm-surface) 0%, #0e0e12 100%)',
      }}
    >
      <FilmStrip position="top" />

      <Label>WHEN</Label>
      <div className="mt-1 font-dm-rank text-[28px] leading-none text-dm-text">
        {m}.{d} {dow}
      </div>
      <div className="mt-0.5 font-dm-mono text-[14px] text-dm-amber">
        {time}{' '}
        <span className="text-[11px] text-dm-text-faint">
          · D-{dd >= 0 ? dd : 0}
        </span>
      </div>

      <DashedDivider />

      <Label>WHERE</Label>
      <div className="mt-1 text-[14px] text-dm-text">{match.theaterName}</div>
      <div className="mt-0.5 text-[11px] text-dm-text-muted">
        {match.location}
      </div>

      <DashedDivider />

      <Label>
        WHO · <span className="text-dm-amber">{joined}</span>/{cap}명
      </Label>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {Array.from({ length: joined }).map((_, i) => (
          <span
            key={`f-${i}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-dm-line-2 bg-dm-surface-2 text-[13px] font-bold text-dm-text"
          >
            {i === 0 ? match.author?.charAt(0).toUpperCase() ?? '?' : '·'}
          </span>
        ))}
        {Array.from({ length: emptyCount }).map((_, i) => (
          <span
            key={`e-${i}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-dm-line-2 text-[13px] text-dm-text-faint"
          >
            ?
          </span>
        ))}
      </div>

      {tags.length > 0 && (
        <>
          <DashedDivider />
          <Label>조건</Label>
          <div className="mt-1.5 flex gap-1">
            {tags.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </>
      )}

      <FilmStrip position="bottom" />
    </div>
  )
}
