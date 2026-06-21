'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { usePublicChatSocket } from '../hooks/use-public-chat-socket'

function createGuestName() {
  return `익명${Math.floor(1000 + Math.random() * 9000)}`
}

const MOBILE_CHROME_OFFSET = 126

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

function useVisibleViewportHeight() {
  const [height, setHeight] = useState<number | null>(null)

  useEffect(() => {
    const updateHeight = () => {
      if (!window.matchMedia('(max-width: 1023px)').matches) {
        setHeight(null)
        return
      }

      const visualHeight = window.visualViewport?.height || window.innerHeight
      setHeight(Math.round(visualHeight))
    }

    updateHeight()
    window.visualViewport?.addEventListener('resize', updateHeight)
    window.visualViewport?.addEventListener('scroll', updateHeight)
    window.addEventListener('resize', updateHeight)

    return () => {
      window.visualViewport?.removeEventListener('resize', updateHeight)
      window.visualViewport?.removeEventListener('scroll', updateHeight)
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  return height
}

export function PublicChatRoom() {
  const { data: session } = useSession()
  const [input, setInput] = useState('')
  const [guestName, setGuestName] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const viewportHeight = useVisibleViewportHeight()

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
  const { isConnected, messages, sendMessage } = usePublicChatSocket(nickName)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage(input)
    setInput('')
  }

  const mobileHeight = viewportHeight
    ? `${Math.max(viewportHeight - MOBILE_CHROME_OFFSET, 360)}px`
    : undefined

  return (
    <div
      className="flex min-h-0 flex-col bg-background text-foreground lg:min-h-[calc(100vh-9rem)]"
      style={mobileHeight ? { height: mobileHeight } : undefined}
    >
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="truncate text-[18px] font-bold">공개 채팅</h1>
            <p className="mt-0.5 truncate text-[12px] text-muted-foreground">
              {nickName}
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground">
            {isConnected ? '접속 중' : '연결 중'}
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
            className={`flex ${message.mine ? 'justify-end' : 'justify-start'}`}
          >
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
        className="sticky bottom-0 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
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
