'use client'

import { useState } from 'react'
import { MessageCircle, UserRound } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { PublicChatAvatar } from './public-chat-avatar'

interface PublicChatProfileMenuProps {
  image?: string
  nickName: string
  disabled?: boolean
  onDirectChat: () => void
  onProfileView: () => void
}

export function PublicChatProfileMenu({
  image,
  nickName,
  disabled,
  onDirectChat,
  onProfileView,
}: PublicChatProfileMenuProps) {
  const [open, setOpen] = useState(false)

  const handleDirectChat = () => {
    setOpen(false)
    onDirectChat()
  }

  const handleProfileView = () => {
    setOpen(false)
    onProfileView()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <PublicChatAvatar
          image={image}
          nickName={nickName}
          disabled={disabled}
        />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        className="w-44 p-2"
        sideOffset={8}
      >
        <div className="mb-1 truncate px-2 py-1 text-[12px] font-semibold">
          {nickName}
        </div>
        <button
          type="button"
          onClick={handleDirectChat}
          className="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-[13px] hover:bg-secondary"
        >
          <MessageCircle className="h-4 w-4" />
          1:1 채팅하기
        </button>
        <button
          type="button"
          onClick={handleProfileView}
          className="flex w-full items-center gap-2 rounded px-2 py-2 text-left text-[13px] hover:bg-secondary"
        >
          <UserRound className="h-4 w-4" />
          프로필 보기
        </button>
      </PopoverContent>
    </Popover>
  )
}
