'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export interface PublicChatMessage {
  id: string
  userId?: number
  nickName: string
  image?: string
  message: string
  createdAt: string
  mine?: boolean
}

interface ServerPublicChatMessage {
  id?: string
  clientId?: string
  userId?: number
  nickName?: string
  nickname?: string
  image?: string
  message?: string
  content?: string
  createdAt?: string
}

interface PublicChatUser {
  nickName: string
  userId?: number
  image?: string
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
    userId: data.userId,
    nickName: data.nickName || data.nickname || '익명',
    image: data.image,
    message,
    createdAt: data.createdAt || new Date().toISOString(),
    mine,
  }
}

export function usePublicChatSocket(user: PublicChatUser) {
  const socketRef = useRef<Socket | null>(null)
  const clientIdRef = useRef<string | null>(null)
  const [messages, setMessages] = useState<PublicChatMessage[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [onlineCount, setOnlineCount] = useState(0)

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
    socket.on('disconnect', () => {
      setIsConnected(false)
      setOnlineCount(0)
    })
    socket.on('onlineCount', (count: number) => {
      setOnlineCount(Number.isFinite(Number(count)) ? Number(count) : 0)
    })
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
      setOnlineCount(0)
    }
  }, [])

  const sendMessage = useCallback(
    (message: string) => {
      const content = message.trim()
      if (!content || !socketRef.current) return

      socketRef.current.emit('message', {
        clientId: clientIdRef.current || getPublicChatClientId(),
        userId: user.userId,
        nickName: user.nickName.trim() || '익명',
        image: user.image,
        message: content,
        createdAt: new Date().toISOString(),
      })
    },
    [user.image, user.nickName, user.userId],
  )

  return { isConnected, messages, onlineCount, sendMessage }
}
