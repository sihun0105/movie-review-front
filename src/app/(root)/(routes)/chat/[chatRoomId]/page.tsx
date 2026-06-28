'use client'

import useChatSocket from '@/app/(root)/(routes)/(home)/hooks/use-chat-socket'
import { DmChatBubble } from '@/components/dm'
import { ChatMessageEntity } from '@/modules/chat'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

interface PageProps {
  params: { chatRoomId: string }
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function ChatRoomPage({ params: { chatRoomId } }: PageProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [newMessage, setNewMessage] = useState('')
  const [localMessages, setLocalMessages] = useState<ChatMessageEntity[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const myUserId = session?.user?.id ? Number(session.user.id) : 0

  const { data: roomData, isLoading: roomLoading } = useSWR(
    myUserId ? `/api/chat/rooms/${chatRoomId}?userId=${myUserId}` : null,
    fetcher,
  )
  const { data: messageData, isLoading: msgLoading, mutate } = useSWR(
    myUserId
      ? `/api/chat/rooms/${chatRoomId}/messages?userId=${myUserId}&pageSize=200`
      : null,
    fetcher,
  )

  const room = roomData?.chatRoom
  const serverMessages: ChatMessageEntity[] = (messageData?.messages ?? []).map(
    (m: any) => ({
      messageId: m.id ?? m.messageId,
      chatRoomId: m.chatRoomId,
      senderId: m.senderId,
      content: m.content,
      createdAt: m.createdAt,
    }),
  )
  const messages = [...serverMessages, ...localMessages]
  const targetProfile = room?.memberProfiles?.find(
    (profile: { userId: number }) => profile.userId !== myUserId,
  )

  const { sendMessage, isConnected } = useChatSocket({
    namespace: 'ws-home',
    chatRoomId,
    onMessage: (message) => setLocalMessages((prev) => [...prev, message]),
    onOnlineList: () => {},
  })

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  // 서버 메시지가 새로 들어오면 로컬 메시지 중 동일한 것 제거 (중복 방지)
  useEffect(() => {
    if (serverMessages.length > 0) {
      setLocalMessages([])
      mutate()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageData])

  const handleSend = () => {
    if (newMessage.trim() && isConnected && room) {
      sendMessage(newMessage.trim())
      setNewMessage('')
    }
  }

  if (status === 'loading' || roomLoading || msgLoading) {
    return (
      <main className="flex min-h-page items-center justify-center bg-background text-muted-foreground">
        <div className="text-center">로딩 중...</div>
      </main>
    )
  }
  if (status === 'unauthenticated') return null
  if (!room) {
    return (
      <main className="flex min-h-page items-center justify-center bg-background text-muted-foreground">
        <div className="text-center">채팅방을 찾을 수 없습니다.</div>
      </main>
    )
  }

  const targetName = targetProfile?.nickname || room.name
  const targetImage = targetProfile?.image || ''
  const initial = targetName.charAt(0).toUpperCase()

  return (
    <main className="flex h-page flex-col bg-background text-foreground">
      <header className="flex items-center gap-2.5 border-b border-border px-3.5 py-2.5">
        <button
          aria-label="뒤로"
          onClick={() => router.push('/chat')}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/[0.06] text-foreground"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" aria-hidden>
            <path
              d="M7 1L1 7l6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary text-[14px] font-bold text-foreground"
        >
          {targetImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={targetImage}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            initial
          )}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold text-foreground">{targetName}</div>
          <div
            className={`text-[10px] ${
              isConnected ? 'text-[#6fc96f]' : 'text-muted-foreground'
            }`}
          >
            ● {isConnected ? 'online' : '연결 중...'}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-3.5 pt-3">
        {messages.length === 0 ? (
          <div className="py-10 text-center font-mono text-[11px] text-muted-foreground">
            아직 메시지가 없어요. 첫 메시지를 보내보세요.
          </div>
        ) : (
          messages.map((message, index) => {
            const isMine = message.senderId === myUserId
            const prev = messages[index - 1]
            const showAvatar = !isMine && (!prev || prev.senderId !== message.senderId)
            return (
              <DmChatBubble
                key={message.messageId ?? index}
                content={message.content}
                isMine={isMine}
                senderName={isMine ? undefined : targetName}
                createdAt={message.createdAt}
                showAvatar={showAvatar}
                avatarInitial={initial}
                avatarImage={targetImage}
              />
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 border-t border-border bg-background p-2.5">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder={isConnected ? '메시지 쓰기...' : '연결 중입니다...'}
          disabled={!isConnected}
          className="h-9 flex-1 border border-border bg-secondary px-3 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-50"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!newMessage.trim() || !isConnected}
          className="border border-primary bg-primary px-3 text-[12px] font-semibold text-white disabled:border-border disabled:bg-secondary disabled:text-muted-foreground"
        >
          전송
        </button>
      </div>
    </main>
  )
}
