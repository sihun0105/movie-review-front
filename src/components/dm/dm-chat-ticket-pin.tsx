interface DmChatTicketPinProps {
  movieTitle: string
  showTime: string | Date
  venue?: string
}

function dDay(target: Date): number {
  return Math.ceil((target.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

export function DmChatTicketPin({
  movieTitle,
  showTime,
  venue,
}: DmChatTicketPinProps) {
  const date =
    typeof showTime === 'string' ? new Date(showTime) : showTime
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const time = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const dd = dDay(date)
  const venueShort = venue?.split(' ')[0]

  return (
    <div
      className="mx-3.5 mt-2.5 flex items-center gap-2 border border-primary px-2.5 py-2"
      style={{
        background:
          'linear-gradient(90deg, rgba(143,31,26,0.13) 0%, transparent 100%)',
      }}
    >
      <span aria-hidden className="text-[14px]">
        🎟
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11px] font-semibold text-foreground">
          {movieTitle}
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">
          {m}.{d} · {time}
          {venueShort && ` · ${venueShort}`}
        </div>
      </div>
      <span className="font-dm-rank text-[18px] leading-none text-yellow-400">
        D-{dd >= 0 ? dd : 0}
      </span>
    </div>
  )
}
