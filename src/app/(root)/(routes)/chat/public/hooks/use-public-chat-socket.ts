'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export interface PublicChatMessage {
  id: string
  nickName: string
  message: string
  createdAt: string
  mine?: boolean
}

interface ServerPublicChatMessage {
  id?: string
  clientId?: string
  nickName?: string
  nickname?: string
  message?: string
  content?: string
  createdAt?: string
}

const PUBLIC_CHAT_CLIENT_ID_KEY = 'bollae-public-chat-client-id'

function createMessageId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function getPublicChatClientId() {
  if (typeof window === 'undefined') return createMessageId()

  const savedClientId = window.localStorage.getItem(PUBLIC_CHAT_CLIENT_ID_KEY)
  if (savedClientId) return savedClientId

  const nextClientId = createMessageId()
  window.localStorage.setItem(PUBLIC_CHAT_CLIENT_ID_KEY, nextClientId)
  return nextClientId
}

function normalizeMessage(
  data: ServerPublicChatMessage,
  mine = false,
): PublicChatMessage | null {
  const message = (data.message || data.content || '').trim()
  if (!message) return null

  return {
    id: data.id || data.clientId || createMessageId(),
    nickName: data.nickName || data.nickname || '익명',
    message,
    createdAt: data.createdAt || new Date().toISOString(),
    mine,
  }
}

export function usePublicChatSocket(nickName: string) {
  const socketRef = useRef<Socket | null>(null)
  const clientIdRef = useRef<string | null>(null)
  const [messages, setMessages] = useState<PublicChatMessage[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const clientId = getPublicChatClientId()
    clientIdRef.current = clientId
    const base =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : process.env.NEXT_PUBLIC_CHAT_SERVER_API
    const socket = io(`${base}/ws-public`, {
      transports: ['websocket', 'polling'],
    })

    socketRef.current = socket
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false))
    socket.on('history', (history: ServerPublicChatMessage[]) => {
      const nextMessages = history
        .map((message) =>
          normalizeMessage(message, message.clientId === clientId),
        )
        .filter((message): message is PublicChatMessage => Boolean(message))

      setMessages(nextMessages)
    })
    socket.on('message', (data: ServerPublicChatMessage) => {
      const isMine = data.clientId === clientId
      const nextMessage = normalizeMessage(data, isMine)
      if (!nextMessage) return

      setMessages((prev) => {
        if (prev.some((message) => message.id === nextMessage.id)) return prev
        return [...prev, nextMessage].slice(-80)
      })
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
      setIsConnected(false)
    }
  }, [])

  const sendMessage = useCallback(
    (message: string) => {
      const content = message.trim()
      if (!content || !socketRef.current) return

      socketRef.current.emit('message', {
        clientId: clientIdRef.current || getPublicChatClientId(),
        nickName: nickName.trim() || '익명',
        message: content,
        createdAt: new Date().toISOString(),
      })
    },
    [nickName],
  )

  return { isConnected, messages, sendMessage }
}
