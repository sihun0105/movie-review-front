'use client'

import { useState } from 'react'
import { MessageCircle, UserRound } from 'lucide-react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { PublicChatAvatar } from './public-chat-avatar'

interface PublicChatProfileMenuProps {
  image?: string
  nickName: string
  canOpenDirectChat: boolean
  canViewProfile: boolean
  onDirectChat: () => void
  onProfileView: () => void
}

export function PublicChatProfileMenu({
  image,
  nickName,
  canOpenDirectChat,
  canViewProfile,
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
    <ContextMenu open={open} onOpenChange={setOpen}>
      <ContextMenuTrigger asChild>
        <PublicChatAvatar
          image={image}
          nickName={nickName}
        />
      </ContextMenuTrigger>
      <ContextMenuContent
        side="right"
        align="start"
        className="w-44"
        sideOffset={8}
      >
        <ContextMenuLabel className="truncate text-[12px]">
          {nickName}
        </ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem
          onSelect={handleDirectChat}
          disabled={!canOpenDirectChat}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          1:1 채팅하기
        </ContextMenuItem>
        <ContextMenuItem
          onSelect={handleProfileView}
          disabled={!canViewProfile}
        >
          <UserRound className="mr-2 h-4 w-4" />
          프로필 보기
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
