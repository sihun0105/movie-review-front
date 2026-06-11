'use client'

import { MatchPost } from '@/lib/type'
import { getMatchScheduleStatus } from '@/lib/utils'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function MatchCard({ match }: { match: MatchPost }) {
  const schedule = getMatchScheduleStatus(match.showTime)
  const dateStr = new Date(match.showTime).toLocaleDateString('ko-KR', {
    month: 'numeric',
    day: 'numeric',
  })

  return (
    <Link
      href={`/match/${match.id}`}
      className={`block border-b border-border px-4 py-3 hover:bg-accent ${schedule.isPast ? 'opacity-70' : ''}`}
    >
      <div className="flex items-baseline gap-1.5">
        <span className="text-[14px] font-semibold text-foreground">
          {dateStr}
        </span>
        <span className={`ml-auto font-mono text-[10px] ${schedule.isPast ? 'text-muted-foreground' : 'text-primary'}`}>
          {schedule.label}
        </span>
      </div>
      <div className="mt-0.5 truncate text-[13px] font-semibold text-foreground">
        {match.movieTitle}
      </div>
      <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
        📍 {match.location} · 👥 {match.currentParticipants}/{match.maxParticipants}
      </div>
    </Link>
  )
}

export function DmDesktopRightSidebar() {
  const { data, isLoading } = useSWR<{ matchPosts: MatchPost[] }>(
    '/api/match?page=1&pageSize=5',
    fetcher,
    { refreshInterval: 60_000 },
  )
  const posts = data?.matchPosts?.slice(0, 5) ?? []

  return (
    <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[320px] lg:shrink-0 lg:flex-col lg:overflow-y-auto lg:border-l lg:border-border lg:bg-background">
      <div className="px-4 pb-2 pt-5">
        <div className="font-mono text-[10px] tracking-[1.5px] text-primary">
          LIVE MATCHING
        </div>
        <div className="mt-1 text-[20px] font-semibold leading-tight text-foreground">
          지금 모집 중인
          <br />
          영화 약속
        </div>
      </div>

      <div className="flex-1">
        {isLoading && (
          <div className="px-4 py-6 font-mono text-[11px] text-muted-foreground">
            loading...
          </div>
        )}
        {!isLoading && posts.length === 0 && (
          <div className="px-4 py-6 font-mono text-[11px] text-muted-foreground">
            모집 중인 매칭이 없습니다.
          </div>
        )}
        {posts.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>

      <div className="px-4 pb-4">
        <Link
          href="/match"
          className="block w-full border border-primary py-2.5 text-center text-[12px] font-semibold text-primary hover:bg-primary/10"
        >
          전체 매칭 보기 →
        </Link>
      </div>
    </aside>
  )
}
