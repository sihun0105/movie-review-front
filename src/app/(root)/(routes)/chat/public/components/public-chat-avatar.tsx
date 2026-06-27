'use client'

import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PublicChatAvatarProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  image?: string
  nickName: string
}

export const PublicChatAvatar = forwardRef<
  HTMLButtonElement,
  PublicChatAvatarProps
>(function PublicChatAvatar({
  image,
  nickName,
  className,
  ...props
}, ref) {
  const initial = nickName.trim().charAt(0).toUpperCase()

  return (
    <button
      ref={ref}
      type="button"
      aria-label={`${nickName} 프로필 메뉴 열기`}
      className={cn(
        'mt-1 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background text-[13px] font-semibold text-muted-foreground',
        className
      )}
      {...props}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="h-full w-full object-cover" />
      ) : initial ? (
        initial
      ) : (
        <UserRound className="h-4 w-4" />
      )}
    </button>
  )
})
