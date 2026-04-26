import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface PillProps {
  children: ReactNode
  accent?: boolean
  filled?: boolean
  className?: string
}

export function Pill({ children, accent, filled, className }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-[3px]',
        'font-dm-mono text-[10px] uppercase tracking-[0.5px]',
        accent ? 'border-dm-red' : 'border-dm-line-2',
        filled
          ? 'bg-dm-red text-dm-text'
          : accent
          ? 'text-dm-red'
          : 'text-dm-text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
