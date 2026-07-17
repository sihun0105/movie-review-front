'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { resolveUserAvatarImage } from '@/lib/utils/user-avatar'

interface DmUserAvatarProps {
  name?: string | null
  image?: string | null
  className?: string
  fallbackClassName?: string
}

export function DmUserAvatar({
  name,
  image,
  className,
  fallbackClassName,
}: DmUserAvatarProps) {
  const initial = name?.trim().charAt(0).toUpperCase() || '?'
  const imageSrc = resolveUserAvatarImage(image)

  return (
    <Avatar className={cn('h-8 w-8 border border-border', className)}>
      <AvatarImage
        src={imageSrc}
        alt={`${name || '사용자'} 프로필`}
        className="object-cover"
        referrerPolicy="no-referrer"
      />
      <AvatarFallback
        delayMs={0}
        className={cn(
          'text-[12px] font-bold text-foreground',
          fallbackClassName,
        )}
      >
        {initial}
      </AvatarFallback>
    </Avatar>
  )
}
