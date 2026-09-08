const DAY_MS = 1000 * 60 * 60 * 24

function startOfDay(date: Date) {
  return Math.floor((date.getTime() + 9 * 60 * 60 * 1000) / DAY_MS) * DAY_MS
}

export function formatMatchDateTime(value: string | Date): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '일정 미정'
  const parts = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ''
  return `${part('month')}.${part('day')}(${part('weekday')}) ${part('hour')}:${part('minute')}`
}

export function getMatchScheduleStatus(
  showTime: string | Date,
  now = new Date(),
) {
  const target = typeof showTime === 'string' ? new Date(showTime) : showTime
  const daysUntil = Math.ceil((startOfDay(target) - startOfDay(now)) / DAY_MS)
  const isPast = target.getTime() < now.getTime()
  const label = isPast
    ? '지난 일정'
    : daysUntil === 0
      ? '오늘'
      : `D-${daysUntil}`

  return { daysUntil, isPast, label }
}
