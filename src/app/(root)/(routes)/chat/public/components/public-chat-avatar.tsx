'use client'

import { UserRound } from 'lucide-react'

interface PublicChatAvatarProps {
  image?: string
  nickName: string
  disabled?: boolean
  onClick?: () => void
}

export function PublicChatAvatar({
  image,
  nickName,
  disabled,
  onClick,
}: PublicChatAvatarProps) {
  const initial = nickName.trim().charAt(0).toUpperCase()

  return (
    <button
      type="button"
      aria-label={`${nickName} 프로필 메뉴 열기`}
      disabled={disabled}
      onClick={onClick}
      className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background text-[13px] font-semibold text-muted-foreground disabled:cursor-default disabled:opacity-70"
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
}
