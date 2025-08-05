'use client'
import { useEffect, useRef, useCallback, useState } from 'react'
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
  onMessage?: (_message: ChatMessage) => void
  onOnlineList?: (_users: number[]) => void
}

const useChatSocket = ({
  namespace = 'ws-home',
  channel,
  onMessage,
  onOnlineList,
}: UseChatSocketProps = {}) => {
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { data: session } = useSession()

  // 콜백을 ref로 저장하여 의존성 배열 문제 해결
  const onMessageRef = useRef(onMessage)
  const onOnlineListRef = useRef(onOnlineList)

  // 콜백 ref 업데이트
  useEffect(() => {
    onMessageRef.current = onMessage
    onOnlineListRef.current = onOnlineList
  }, [onMessage, onOnlineList])

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(`https://drunkenmovie.shop/${namespace}`, {
        transports: ['websocket', 'polling'],
      })

      // 연결 이벤트 리스너 등록
      socketRef.current.on('connect', () => {
        setIsConnected(true)
      })

      socketRef.current.on('disconnect', () => {
        setIsConnected(false)
      })

      socketRef.current.on('hello', (namespaceName: string) => {
        console.log('Connected to namespace:', namespaceName)
      })

      socketRef.current.on('message', (message: ChatMessage) => {
        if (onMessageRef.current) {
          onMessageRef.current({
            ...message,
            timestamp: new Date().toISOString(),
          })
        }
      })

      socketRef.current.on('onlineList', (users: number[]) => {
        if (onOnlineListRef.current) {
          onOnlineListRef.current(users)
        }
      })
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
        setIsConnected(false)
      }
    }
  }, [namespace]) // onMessage, onOnlineList 제거

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
    isConnected,
  }
}

export default useChatSocket
