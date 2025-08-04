'use client'
import { useEffect, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { useSession } from 'next-auth/react'

interface ChatMessage {
  id: number
  nickName: string
  message: string
  timestamp?: string
}

interface UseChatSocketProps {
  namespace?: string
  channel?: number
  onMessage?: (message: ChatMessage) => void
  onOnlineList?: (users: number[]) => void
}

const useChatSocket = ({
  namespace = 'ws-home',
  channel,
  onMessage,
  onOnlineList,
}: UseChatSocketProps = {}) => {
  const socketRef = useRef<Socket | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(`https://drunkenmovie.shop/${namespace}`, {
        transports: ['websocket', 'polling'],
      })

      // 연결 이벤트 리스너 등록
      socketRef.current.on('hello', (namespaceName: string) => {
        console.log('Connected to namespace:', namespaceName)
      })

      socketRef.current.on('message', (message: ChatMessage) => {
        if (onMessage) {
          onMessage({
            ...message,
            timestamp: new Date().toISOString(),
          })
        }
      })

      socketRef.current.on('onlineList', (users: number[]) => {
        if (onOnlineList) {
          onOnlineList(users)
        }
      })
    }

    return () => {
      socketRef.current?.disconnect()
    }
  }, [namespace, onMessage, onOnlineList])

  // 로그인 처리
  useEffect(() => {
    if (socketRef.current && session?.user?.id && channel) {
      socketRef.current.emit('login', {
        id: parseInt(session.user.id),
        channels: [channel],
      })
    }
  }, [session?.user?.id, channel])

  // 메시지 전송
  const sendMessage = useCallback(
    (message: string) => {
      if (socketRef.current && session?.user?.id && channel) {
        socketRef.current.emit('message', {
          channel,
          userId: parseInt(session.user.id),
          message,
        })
      }
    },
    [session?.user?.id, channel],
  )

  // 헬스 체크
  const sendHealth = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('health')
    }
  }, [])

  return {
    socket: socketRef.current,
    sendMessage,
    sendHealth,
    isConnected: socketRef.current?.connected || false,
  }
}

export default useChatSocket
