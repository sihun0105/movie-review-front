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
        'mt-5 mb-2 flex items-baseline font-dm-display text-[15px] font-bold text-dm-text',
        className,
      )}
    >
      <span>{children}</span>
      {meta !== undefined && (
        <span className="ml-1.5 font-dm-mono text-[11px] text-dm-text-faint">
          {meta}
        </span>
      )}
    </div>
  )
}
