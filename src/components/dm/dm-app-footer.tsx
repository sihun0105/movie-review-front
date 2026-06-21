'use client'

import { Mail } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface DmAppFooterProps {
  className?: string
}

export function DmAppFooter({ className }: DmAppFooterProps) {
  const pathname = usePathname()
  if (pathname === '/chat/public') return null

  return (
    <footer
      className={`mt-10 border-t border-border bg-background-deep px-6 py-8 text-muted-foreground ${className ?? ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-dm-display text-[15px] italic font-bold text-muted-foreground">
            볼래
          </div>
          <p className="mt-2 text-[11px] leading-[1.6]">
            오늘 밤 같이 볼 사람을 찾으세요.
            <br />
            최신 영화 추천·리뷰·평점·매칭.
          </p>
        </div>
        <a
          href="mailto:tlgns14@nate.com"
          aria-label="이메일 보내기"
          className="text-muted-foreground hover:text-primary"
        >
          <Mail className="h-5 w-5" />
        </a>
      </div>
      <div className="mt-6 font-mono text-[10px] tracking-[0.5px] text-muted-foreground">
        © 2026 볼래 · bollae
      </div>
    </footer>
  )
}
