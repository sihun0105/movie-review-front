'use client'

import { MatchPost } from '@/lib/type'
import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function dDay(showTime: string) {
  const diff = Math.ceil(
    (new Date(showTime).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  )
  return diff >= 0 ? `D-${diff}` : '마감'
}

function MatchCard({ match }: { match: MatchPost }) {
  const dd = dDay(match.showTime)
  const dateStr = new Date(match.showTime).toLocaleDateString('ko-KR', {
    month: 'numeric',
    day: 'numeric',
  })

  return (
    <Link
      href={`/match/${match.id}`}
      className="block border-b border-dm-line px-4 py-3 hover:bg-dm-surface"
    >
      <div className="flex items-baseline gap-1.5">
        <span className="font-dm-display text-[18px] italic text-dm-amber">
          {dateStr}
        </span>
        <span className="ml-auto font-dm-mono text-[10px] text-dm-amber">
          {dd}
        </span>
      </div>
      <div className="mt-0.5 truncate text-[13px] font-semibold text-dm-text">
        {match.movieTitle}
      </div>
      <div className="mt-0.5 font-dm-mono text-[10px] text-dm-text-faint">
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
    <aside
      className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[320px] lg:shrink-0 lg:flex-col lg:overflow-y-auto lg:border-l lg:border-dm-line"
      style={{ background: '#0e0e12' }}
    >
      <div className="px-4 pb-2 pt-5">
        <div className="font-dm-mono text-[10px] tracking-[1.5px] text-dm-amber">
          LIVE MATCHING
        </div>
        <div className="mt-1 font-dm-display text-[20px] italic leading-tight text-dm-text">
          지금 모집 중인
          <br />
          영화 약속
        </div>
      </div>

      <div className="flex-1">
        {isLoading && (
          <div className="px-4 py-6 font-dm-mono text-[11px] text-dm-text-faint">
            loading...
          </div>
        )}
        {!isLoading && posts.length === 0 && (
          <div className="px-4 py-6 font-dm-mono text-[11px] text-dm-text-faint">
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
          className="block w-full border border-dm-red py-2.5 text-center text-[12px] font-semibold text-dm-red hover:bg-dm-red/10"
        >
          전체 매칭 보기 →
        </Link>

        <div className="mt-3 border border-dashed border-dm-line-2 p-3" style={{ background: 'rgba(192,48,40,0.04)' }}>
          <div className="flex items-center gap-1.5 font-dm-mono text-[10px] text-dm-red">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-dm-red"
              style={{ boxShadow: '0 0 6px var(--dm-red)' }}
            />
            마감 임박
          </div>
          <div className="mt-1.5 font-dm-display text-[13px] italic leading-snug text-dm-text">
            오늘 마감되는 매칭을
            <br />
            놓치지 마세요.
          </div>
        </div>
      </div>
    </aside>
  )
}
