import Link from 'next/link'

interface MatchHeroBannerProps {
  todayLabel: string
  liveCount?: number
  nearbyCount?: number
}

export function MatchHeroBanner({ todayLabel, liveCount, nearbyCount }: MatchHeroBannerProps) {
  return (
    <div className="px-4 pt-5 pb-2">
      <div className="font-mono text-[11px] text-muted-foreground">{todayLabel}</div>
      <h1 className="mt-1 text-[24px] font-bold leading-[1.2] tracking-tight text-foreground">
        오늘 밤,<br />같이 볼래요?
      </h1>
      <p className="mt-1.5 text-[13px] text-muted-foreground">
        지금 모집 중인 영화 약속
        {liveCount !== undefined && (
          <> · 모집 <span className="font-semibold text-foreground">{liveCount}개</span></>
        )}
      </p>
      <div className="mt-4 flex gap-2">
        <Link
          href="/match/new"
          className="flex h-9 flex-1 items-center justify-center rounded-md bg-primary text-[13px] font-medium text-primary-foreground"
        >
          ＋ 매칭 만들기
        </Link>
        <Link
          href="/match"
          className="flex h-9 flex-1 items-center justify-center rounded-md border border-border text-[13px] font-medium text-foreground hover:bg-accent"
        >
          둘러보기
        </Link>
      </div>
    </div>
  )
}
