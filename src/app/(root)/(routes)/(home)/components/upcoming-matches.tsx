import { DmMatchTicket } from '@/components/dm'
import type { MatchPost } from '@/lib/type'
import { getMatchScheduleStatus } from '@/lib/utils'
import { MatchPostRepository } from '@/modules/match/match-post-repository'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function selectUpcomingMatches(matches: MatchPost[], now = new Date()) {
  return matches
    .filter((match) => {
      const showTime = new Date(match.showTime)
      return (
        !Number.isNaN(showTime.getTime()) &&
        match.currentParticipants < match.maxParticipants &&
        !getMatchScheduleStatus(showTime, now).isPast
      )
    })
    .sort(
      (left, right) =>
        new Date(left.showTime).getTime() - new Date(right.showTime).getTime(),
    )
    .slice(0, 3)
}

export async function UpcomingMatches() {
  const result = await new MatchPostRepository()
    .getMatchPosts(1, 100)
    .catch(() => null)
  const matches = selectUpcomingMatches(result?.matchPosts ?? [])

  if (!matches.length) return null

  return (
    <section className="mt-6 border-t border-border">
      <div className="flex items-center justify-between px-4 py-4">
        <div>
          <h2 className="text-base font-semibold">곧 열리는 영화 약속</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            가까운 일정부터 함께 볼 사람을 찾아보세요.
          </p>
        </div>
        <Link
          href="/match"
          className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          전체 보기
          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid gap-2 px-4 md:grid-cols-3">
        {matches.map((match) => (
          <DmMatchTicket key={match.id} match={match} />
        ))}
      </div>
    </section>
  )
}
