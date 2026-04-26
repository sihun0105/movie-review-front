import Link from 'next/link'

interface MatchHeroBannerProps {
  todayLabel: string
  liveCount?: number
  nearbyCount?: number
}

export function MatchHeroBanner({
  todayLabel,
  liveCount,
  nearbyCount,
}: MatchHeroBannerProps) {
  return (
    <Link
      href="/match"
      className="relative m-4 block overflow-hidden rounded border border-dm-line-2 p-4"
      style={{
        background: 'linear-gradient(135deg, var(--dm-surface) 0%, #1a0a0a 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-20"
        style={{
          background:
            'repeating-linear-gradient(90deg, transparent 0 8px, rgba(192,48,40,0.12) 8px 10px)',
        }}
        aria-hidden
      />
      <div className="font-dm-mono text-[10px] uppercase tracking-[1px] text-dm-amber">
        {todayLabel}
      </div>
      <div className="mt-1 mb-0.5 font-dm-display text-[22px] italic leading-[1.2] text-dm-text break-keep [text-wrap:balance]">
        오늘 밤, 같이 볼래요?
      </div>
      <div className="mb-3 text-[12px] text-dm-text-muted">
        지금 매칭 중인 사람{' '}
        <span className="font-semibold text-dm-amber">
          {liveCount ?? 0}명
        </span>
        {nearbyCount !== undefined && (
          <>
            {' · '}내 근처 <b className="text-dm-text">{nearbyCount}명</b>
          </>
        )}
      </div>
      <div className="flex gap-2">
        <span className="inline-flex items-center gap-1.5 bg-dm-red px-4 py-2.5 text-[13px] font-semibold tracking-[-0.01em] text-white">
          🎟 매칭 둘러보기
        </span>
        <span className="border border-dm-line-2 px-3 py-2.5 text-[13px] text-dm-text">
          ＋ 내 글 쓰기
        </span>
      </div>
    </Link>
  )
}
