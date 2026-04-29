'use client'

import useChatSocket from '@/app/(root)/(routes)/(home)/hooks/use-chat-socket'
import { useChatRoom } from '@/app/(root)/(routes)/match/hooks/use-chat-room'
import { useMatchPost } from '@/app/(root)/(routes)/match/hooks/use-match-post'
import { DmChatBubble, DmChatTicketPin } from '@/components/dm'
import { ChatMessageEntity } from '@/modules/chat'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface ChatContainerProps {
  matchId: string
  targetUserId: string
}

function ChatStatus({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-page items-center justify-center bg-dm-bg text-dm-text-muted">
      <div className="text-center">{children}</div>
    </main>
  )
}

const ChatContainer = ({ matchId, targetUserId }: ChatContainerProps) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { matchPost, isLoading: matchLoading } = useMatchPost(matchId)
  const {
    chatRoom,
    messages,
    loading: chatLoading,
    error: chatError,
    addMessage,
  } = useChatRoom(matchId, targetUserId)
  const { sendMessage, isConnected } = useChatSocket({
    namespace: 'ws-home',
    chatRoomId: chatRoom?.chatRoomId,
    onMessage: (message: ChatMessageEntity) => addMessage(message),
    onOnlineList: () => {},
  })

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (newMessage.trim() && isConnected && chatRoom) {
      sendMessage(newMessage.trim())
      setNewMessage('')
    }
  }

  if (status === 'loading' || matchLoading || chatLoading) {
    return <ChatStatus>로딩 중...</ChatStatus>
  }
  if (status === 'unauthenticated') return null
  if (chatError) {
    return (
      <ChatStatus>
        <p className="text-dm-red">오류: {chatError}</p>
        <button
          type="button"
          onClick={() => router.push('/match')}
          className="mt-3 border border-dm-line-2 px-3 py-1.5 text-[12px] text-dm-text"
        >
          매칭 목록으로
        </button>
      </ChatStatus>
    )
  }
  if (!matchPost) {
    return <ChatStatus>매치 정보를 찾을 수 없습니다.</ChatStatus>
  }
  if (!chatRoom) {
    return <ChatStatus>채팅방을 준비하고 있습니다...</ChatStatus>
  }

  const targetName =
    matchPost.userno.toString() === targetUserId
      ? matchPost.author
      : `사용자 ${targetUserId}`
  const myUserId = parseInt(session?.user?.id || '0')
  const initial = targetName.charAt(0).toUpperCase()

  return (
    <main className="flex h-page flex-col bg-dm-bg text-dm-text">
      <header className="flex items-center gap-2.5 border-b border-dm-line px-3.5 py-2.5">
        <button
          aria-label="뒤로"
          onClick={() => router.push(`/match/${matchId}`)}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/[0.06] text-dm-text"
        >
          <svg width="8" height="14" viewBox="0 0 8 14">
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
          className="flex h-9 w-9 items-center justify-center rounded-full border border-dm-line-2 bg-dm-surface-2 text-[14px] font-bold text-dm-text"
        >
          {initial}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold text-dm-text">
            {targetName}
          </div>
          <div
            className={`text-[10px] ${isConnected ? 'text-[#6fc96f]' : 'text-dm-text-faint'}`}
          >
            ● {isConnected ? 'online' : '연결 중...'}
          </div>
        </div>
      </header>

      <DmChatTicketPin
        movieTitle={matchPost.movieTitle}
        showTime={matchPost.showTime}
        venue={matchPost.theaterName}
      />

      <div className="flex-1 overflow-y-auto px-3.5 pt-3">
        {messages.length === 0 ? (
          <div className="py-10 text-center font-dm-mono text-[11px] text-dm-text-faint">
            아직 메시지가 없어요. 첫 메시지를 보내보세요.
          </div>
        ) : (
          messages.map((message, index) => {
            const isMine = message.senderId === myUserId
            const prev = messages[index - 1]
            const showAvatar =
              !isMine && (!prev || prev.senderId !== message.senderId)
            return (
              <DmChatBubble
                key={index}
                content={message.content}
                isMine={isMine}
                senderName={
                  isMine ? undefined : message.senderName ?? targetName
                }
                createdAt={message.createdAt}
                showAvatar={showAvatar}
                avatarInitial={initial}
              />
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 border-t border-dm-line bg-dm-bg p-2.5">
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
          className="h-9 flex-1 border border-dm-line-2 bg-dm-surface px-3 text-[13px] text-dm-text placeholder:text-dm-text-faint focus:border-dm-amber focus:outline-none disabled:opacity-50"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!newMessage.trim() || !isConnected}
          className="border border-dm-red bg-dm-red px-3 text-[12px] font-semibold text-white disabled:border-dm-line-2 disabled:bg-dm-surface-2 disabled:text-dm-text-faint"
        >
          전송
        </button>
      </div>
    </main>
  )
}

export { ChatContainer }
