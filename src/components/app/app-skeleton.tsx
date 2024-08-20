import * as React from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export interface AppSelectItem {
  value: string
  label: string
}

const AppSkeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    >
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

export { AppSkeleton }
