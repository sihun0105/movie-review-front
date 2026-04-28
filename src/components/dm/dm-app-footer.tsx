import { Mail } from 'lucide-react'

interface DmAppFooterProps {
  className?: string
}

export function DmAppFooter({ className }: DmAppFooterProps) {
  return (
    <footer
      className={`mt-10 border-t border-dm-line bg-dm-bg-deep px-6 py-8 text-dm-text-faint ${className ?? ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-dm-display text-[15px] italic font-bold text-dm-text-muted">
            drunken<span className="text-dm-red">movie</span>
          </div>
          <p className="mt-2 text-[11px] leading-[1.6]">
            영화 뭐함? 영화뭐함에서 찾으세요.
            <br />
            최신 영화 추천·리뷰·평점·매칭.
          </p>
        </div>
        <a
          href="mailto:tlgns14@nate.com"
          aria-label="이메일 보내기"
          className="text-dm-text-muted hover:text-dm-amber"
        >
          <Mail className="h-5 w-5" />
        </a>
      </div>
      <div className="mt-6 font-dm-mono text-[10px] tracking-[0.5px] text-dm-text-faint">
        © 2026 영화뭐함 · DrunkenMovie
      </div>
    </footer>
  )
}
