import { describe, expect, it } from 'vitest'
import { formatMatchDateTime, getMatchScheduleStatus } from './match-schedule'

describe('match schedule server/client consistency', () => {
  it('formats UTC timestamps as Korean local dates and times', () => {
    expect(formatMatchDateTime('2026-09-08T15:30:00.000Z')).toBe(
      '09.09(수) 00:30',
    )
    expect(formatMatchDateTime('invalid')).toBe('일정 미정')
  })
  it('uses Korean midnight when calculating days until a match', () => {
    expect(
      getMatchScheduleStatus(
        '2026-09-08T15:30:00.000Z',
        new Date('2026-09-08T14:30:00.000Z'),
      ),
    ).toEqual({ daysUntil: 1, isPast: false, label: 'D-1' })
    expect(
      getMatchScheduleStatus(
        '2026-09-08T15:30:00.000Z',
        new Date('2026-09-08T15:31:00.000Z'),
      ).label,
    ).toBe('지난 일정')
  })
})
