'use client'

import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { DmUserAvatar } from '@/components/dm'

interface PublicChatAvatarProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  image?: string
  nickName: string
}

export const PublicChatAvatar = forwardRef<
  HTMLButtonElement,
  PublicChatAvatarProps
>(function PublicChatAvatar({ image, nickName, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={`${nickName} 프로필 메뉴 열기`}
      className={cn(
        'mt-1 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background text-[13px] font-semibold text-muted-foreground',
        className,
      )}
      {...props}
    >
      <DmUserAvatar
        name={nickName}
        image={image}
        className="h-full w-full border-0"
      />
    </button>
  )
})
