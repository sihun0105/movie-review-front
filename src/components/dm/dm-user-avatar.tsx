'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { resolveUserAvatarImage } from '@/lib/utils/user-avatar'
import { useState } from 'react'
import type { AvatarImageState } from './dm-user-avatar-state'
import {
  isAvatarDataPending,
  isAvatarImagePending,
} from './dm-user-avatar-state'
import { Skeleton } from './skeleton'

interface DmUserAvatarProps {
  name?: string | null
  image?: string | null
  isLoading?: boolean
  className?: string
  fallbackClassName?: string
}

export function DmUserAvatar({
  name,
  image,
  isLoading,
  className,
  fallbackClassName,
}: DmUserAvatarProps) {
  const imageSrc = resolveUserAvatarImage(image)
  const [imageState, setImageState] = useState<AvatarImageState>({
    src: imageSrc,
    status: 'idle',
  })
  const isUserPending = isAvatarDataPending(isLoading, name, image)

  if (isUserPending) {
    return (
      <Skeleton
        role="status"
        aria-busy="true"
        aria-label="프로필 이미지 로딩 중"
        className={cn('h-8 w-8 shrink-0 rounded-full', className)}
      />
    )
  }

  const initial = name?.trim().charAt(0).toUpperCase() || '?'
  const isImagePending = isAvatarImagePending(imageSrc, imageState)

  return (
    <Avatar
      aria-busy={isImagePending}
      className={cn('h-8 w-8 border border-border', className)}
    >
      <AvatarImage
        src={imageSrc}
        alt={`${name || '사용자'} 프로필`}
        className="object-cover"
        referrerPolicy="no-referrer"
        onLoadingStatusChange={(status) =>
          setImageState({ src: imageSrc, status })
        }
      />
      <AvatarFallback
        delayMs={0}
        className={cn(
          'text-[12px] font-bold text-foreground',
          fallbackClassName,
        )}
      >
        {isImagePending ? (
          <Skeleton aria-hidden="true" className="h-full w-full rounded-full" />
        ) : (
          initial
        )}
      </AvatarFallback>
    </Avatar>
  )
}
