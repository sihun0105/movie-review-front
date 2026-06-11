const DAY_MS = 1000 * 60 * 60 * 24

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function getMatchScheduleStatus(
  showTime: string | Date,
  now = new Date(),
) {
  const target = typeof showTime === 'string' ? new Date(showTime) : showTime
  const daysUntil = Math.ceil(
    (startOfDay(target).getTime() - startOfDay(now).getTime()) / DAY_MS,
  )
  const isPast = target.getTime() < now.getTime()
  const label = isPast ? '지난 일정' : daysUntil === 0 ? '오늘' : `D-${daysUntil}`

  return { daysUntil, isPast, label }
}
