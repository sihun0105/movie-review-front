export function DmLoginMarquee() {
  return (
    <div
      className="relative overflow-hidden px-6 pt-10 pb-8"
      style={{
        background:
          'linear-gradient(180deg, var(--dm-surface) 0%, var(--dm-bg) 100%)',
      }}
    >
      <div className="font-dm-mono text-[10px] tracking-[2px] text-dm-amber">
        NOW PLAYING
      </div>
      <h1 className="mt-2.5 font-dm-display text-[32px] italic leading-[1.1] text-dm-text">
        영화에
        <br />
        취하는 시간,
        <br />
        <span className="text-dm-red">drunkenmovie</span>.
      </h1>
      <p className="mt-4 text-[13px] leading-[1.6] text-dm-text-muted">
        리뷰를 쓰고, 별점을 남기고,
        <br />
        같이 볼 사람을 만나요.
      </p>
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-3.5"
        style={{
          background:
            'repeating-linear-gradient(90deg, #000 0 14px, transparent 14px 18px, #000 18px 32px, transparent 32px 36px)',
        }}
      />
    </div>
  )
}
