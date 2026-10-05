'use client'

import { MatchPost } from '@/lib/type'
import { getMatchScheduleStatus } from '@/lib/utils'
import Link from 'next/link'
import { MessageCircle, Plus } from 'lucide-react'
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
  const posts = data?.matchPosts
    ?.filter(
      (match) =>
        match.currentParticipants < match.maxParticipants &&
        !getMatchScheduleStatus(match.showTime).isPast,
    )
    ?.slice(0, 5) ?? []

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
          <div className="space-y-3 px-4 py-6">
            <p className="text-[12px] leading-5 text-muted-foreground">
              아직 모집 중인 약속이 없어요. 먼저 영화 약속을 만들거나 공개
              채팅에서 이야기를 시작해보세요.
            </p>
            <Link
              href="/match/new"
              className="flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-3 text-[12px] font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              새 매칭 만들기
            </Link>
            <Link
              href="/chat/public"
              className="flex h-9 items-center justify-center gap-2 rounded-md border border-border px-3 text-[12px] font-semibold text-foreground hover:bg-accent"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              공개 채팅 참여
            </Link>
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
