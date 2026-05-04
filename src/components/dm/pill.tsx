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
        'font-mono text-[10px] uppercase tracking-[0.5px]',
        accent ? 'border-primary' : 'border-border',
        filled
          ? 'bg-primary text-foreground'
          : accent
          ? 'text-primary'
          : 'text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}
