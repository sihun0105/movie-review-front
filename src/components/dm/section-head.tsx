import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface SectionHeadProps {
  children: ReactNode
  meta?: ReactNode
  className?: string
}

export function SectionHead({ children, meta, className }: SectionHeadProps) {
  return (
    <div
      className={cn(
        'mt-5 mb-2 flex items-baseline text-[15px] font-semibold text-foreground',
        className,
      )}
    >
      <span>{children}</span>
      {meta !== undefined && (
        <span className="ml-1.5 font-mono text-[11px] text-muted-foreground">
          {meta}
        </span>
      )}
    </div>
  )
}
