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
          ? '-mt-[18px] mb-3.5 border-b border-border'
          : 'mt-3.5 -mb-[18px] border-t border-border'
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
    <div className="font-mono text-[10px] uppercase tracking-[1px] text-muted-foreground">
      {children}
    </div>
  )
}

function DashedDivider() {
  return (
    <div
      className="my-3.5 border-t border-dashed border-border"
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
    <div className="relative border border-border bg-card p-[18px]">
      <FilmStrip position="top" />

      <Label>WHEN</Label>
      <div className="mt-1 font-dm-rank text-[28px] leading-none text-foreground">
        {m}.{d} {dow}
      </div>
      <div className="mt-0.5 font-mono text-[14px] text-primary">
        {time}{' '}
        <span className="text-[11px] text-muted-foreground">
          · D-{dd >= 0 ? dd : 0}
        </span>
      </div>

      <DashedDivider />

      <Label>WHERE</Label>
      <div className="mt-1 text-[14px] text-foreground">{match.theaterName}</div>
      <div className="mt-0.5 text-[11px] text-muted-foreground">
        {match.location}
      </div>

      <DashedDivider />

      <Label>
        WHO · <span className="text-primary">{joined}</span>/{cap}명
      </Label>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {Array.from({ length: joined }).map((_, i) => (
          <span
            key={`f-${i}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-[13px] font-bold text-foreground"
          >
            {i === 0 ? match.author?.charAt(0).toUpperCase() ?? '?' : '·'}
          </span>
        ))}
        {Array.from({ length: emptyCount }).map((_, i) => (
          <span
            key={`e-${i}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-border text-[13px] text-muted-foreground"
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
