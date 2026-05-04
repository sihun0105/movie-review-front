'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

interface AppHeaderProps {
  title: string
  showBack?: boolean
  right?: ReactNode
  transparent?: boolean
}

export function AppHeader({ title, showBack, right, transparent }: AppHeaderProps) {
  const router = useRouter()
  return (
    <div
      className={cn(
        'sticky top-0 left-0 right-0 z-10 flex h-[52px] items-center px-3.5',
        transparent
          ? 'absolute bg-transparent backdrop-blur-md'
          : 'bg-background border-b border-border',
      )}
    >
      {showBack ? (
        <button
          onClick={() => router.back()}
          aria-label="뒤로"
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/[0.06] text-foreground"
        >
          <svg width="8" height="14" viewBox="0 0 8 14">
            <path
              d="M7 1L1 7l6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        <div className="w-[34px]" aria-hidden />
      )}
      <div className="flex-1 text-center font-dm-display text-[17px] italic font-bold tracking-[-0.01em] text-foreground">
        {title}
      </div>
      <div className="flex w-[34px] justify-end">{right}</div>
    </div>
  )
}
