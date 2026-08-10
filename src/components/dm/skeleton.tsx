import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

type SkeletonProps = HTMLAttributes<HTMLDivElement>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      {...props}
      className={cn('animate-pulse rounded-none bg-secondary', className)}
    />
  )
}
