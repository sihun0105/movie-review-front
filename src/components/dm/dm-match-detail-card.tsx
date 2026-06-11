import { MatchPost } from '@/lib/type'
import { cn, getMatchScheduleStatus } from '@/lib/utils'

interface DmMatchDetailCardProps {
  match: MatchPost
}

const DOW = ['일', '월', '화', '수', '목', '금', '토']

function InfoRow({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="rounded-md border border-border bg-background/55 px-3.5 py-3">
      <div className="text-[11px] font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 break-keep text-[15px] font-semibold leading-snug text-foreground">
        {value}
      </div>
      {sub && (
        <div className="mt-0.5 break-keep text-[12px] leading-snug text-muted-foreground">
          {sub}
        </div>
      )}
    </div>
  )
}

export function DmMatchDetailCard({ match }: DmMatchDetailCardProps) {
  const showTime = new Date(match.showTime)
  const month = String(showTime.getMonth() + 1).padStart(2, '0')
  const day = String(showTime.getDate()).padStart(2, '0')
  const dow = DOW[showTime.getDay()]
  const time = showTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const schedule = getMatchScheduleStatus(match.showTime)
  const joined = match.currentParticipants
  const cap = match.maxParticipants
  const isFull = joined >= cap
  const genderLabel =
    match.gender === 'male' ? '남성만' : match.gender === 'female' ? '여성만' : '성별 무관'

  return (
    <section className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[12px] font-medium text-muted-foreground">영화 약속</div>
          <div className="mt-1 text-[18px] font-semibold leading-tight text-foreground">
            {match.title || match.movieTitle}
          </div>
        </div>
        <span
          className={cn(
            'shrink-0 rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold',
            schedule.isPast || isFull
              ? 'bg-muted text-muted-foreground'
              : 'bg-primary/10 text-primary',
          )}
        >
          {schedule.label}
        </span>
      </div>

      <div className="mt-4 grid gap-2">
        <InfoRow label="일정" value={`${month}.${day}(${dow}) ${time}`} />
        <InfoRow label="장소" value={match.theaterName} sub={match.location} />
        <div className="grid grid-cols-2 gap-2">
          <InfoRow
            label="참여 인원"
            value={`${joined}/${cap}명`}
            sub={isFull ? '모집이 마감됐어요' : `${cap - joined}자리 남았어요`}
          />
          <InfoRow label="참여 조건" value={genderLabel} />
        </div>
      </div>
    </section>
  )
}
