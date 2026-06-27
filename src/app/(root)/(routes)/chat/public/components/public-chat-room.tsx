'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useAppToast } from '@/hooks/use-app-toast'
import { PublicChatProfileMenu } from './public-chat-profile-menu'
import type { PublicChatMessage } from '../hooks/use-public-chat-socket'
import { usePublicChatSocket } from '../hooks/use-public-chat-socket'

function createGuestName() {
  return `익명${Math.floor(1000 + Math.random() * 9000)}`
}

function formatDateTime(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function PublicChatRoom() {
  const { data: session } = useSession()
  const router = useRouter()
  const { showToast } = useAppToast()
  const [input, setInput] = useState('')
  const [guestName, setGuestName] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem('bollae.public-chat.nickname')
    const nextName = stored || createGuestName()
    window.localStorage.setItem('bollae.public-chat.nickname', nextName)
    setGuestName(nextName)
  }, [])

  const nickName = useMemo(
    () => session?.user?.nickname || session?.user?.name || guestName || '익명',
    [guestName, session?.user?.name, session?.user?.nickname],
  )
  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined
  const { isConnected, messages, onlineCount, sendMessage } =
    usePublicChatSocket({
      nickName,
      userId: currentUserId,
      image: session?.user?.image,
    })

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage(input)
    setInput('')
  }

  const startDirectChat = async (message: PublicChatMessage) => {
    if (!currentUserId) {
      router.push('/login?callbackUrl=/chat/public')
      return
    }
    if (!message.userId || message.userId === currentUserId) return

    try {
      const response = await fetch('/api/chat/direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentUserId,
          targetUserId: message.userId,
          targetUserName: message.nickName,
        }),
      })
      const data = await response.json()
      const chatRoomId = data?.chatRoom?.chatRoomId
      if (!response.ok || !chatRoomId) throw new Error()
      router.push(`/chat/${chatRoomId}`)
    } catch {
      showToast('1:1 채팅방을 열지 못했어요.')
    }
  }

  const showProfile = (message: PublicChatMessage) => {
    showToast(`${message.nickName} 프로필`)
  }

  return (
    <div className="flex h-[calc(100dvh-8rem-env(safe-area-inset-bottom))] min-h-[22rem] w-full flex-col overflow-hidden bg-background text-foreground lg:min-h-[calc(100vh-9rem)]">
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="truncate text-[18px] font-bold">공개 채팅</h1>
            <p className="mt-0.5 truncate text-[12px] text-muted-foreground">
              {nickName}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">
            {isConnected ? `${onlineCount}명 접속 중` : '연결 중'}
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="flex min-h-[40vh] items-center justify-center text-center text-[13px] text-muted-foreground">
            첫 메시지를 남겨보세요.
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${message.mine ? 'justify-end' : 'justify-start'}`}
          >
            {!message.mine && (
              <PublicChatProfileMenu
                image={message.image}
                nickName={message.nickName}
                disabled={!message.userId}
                onDirectChat={() => startDirectChat(message)}
                onProfileView={() => showProfile(message)}
              />
            )}
            <div
              className={`max-w-[82%] rounded-md border px-3 py-2 ${
                message.mine
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-secondary text-foreground'
              }`}
            >
              <div className="mb-1 flex items-center gap-2 text-[11px] opacity-80">
                <span className="max-w-[8rem] truncate">
                  {message.nickName}
                </span>
                <span className="shrink-0">{formatDateTime(message.createdAt)}</span>
              </div>
              <p className="whitespace-pre-wrap break-words text-[14px] leading-5">
                {message.message}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex shrink-0 gap-2 border-t border-border bg-background/95 p-3 backdrop-blur"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onFocus={() => setTimeout(scrollToBottom, 80)}
          placeholder="메시지 입력"
          className="min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-3 text-[14px] outline-none focus:border-primary"
        />
        <button
          type="submit"
          aria-label="보내기"
          disabled={!input.trim()}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary text-white disabled:bg-secondary disabled:text-muted-foreground"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
