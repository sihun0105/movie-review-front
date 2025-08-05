'use client'
import { useEffect, useRef, useCallback, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useSession } from 'next-auth/react'
import { ChatMessageEntity } from '@/modules/chat'

interface UseChatSocketProps {
  namespace?: string
  chatRoomId?: string
  onMessage?: (_message: ChatMessageEntity) => void
  onOnlineList?: (_users: number[]) => void
}

const useChatSocket = ({
  namespace = 'ws-home',
  chatRoomId,
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

      socketRef.current.on('message', (message: ChatMessageEntity) => {
        console.log('Socket received message:', message)
        if (onMessageRef.current) {
          onMessageRef.current(message)
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
  }, [namespace])

  // 채팅방 참여
  useEffect(() => {
    if (socketRef.current && session?.user?.id && chatRoomId) {
      socketRef.current.emit('joinRoom', {
        userId: parseInt(session.user.id),
        chatRoomId: chatRoomId,
      })
    }
  }, [session?.user?.id, chatRoomId])

  // 메시지 전송
  const sendMessage = useCallback(
    async (content: string) => {
      if (socketRef.current && session?.user?.id && chatRoomId) {
        const payload = {
          chatRoomId,
          senderId: parseInt(session.user.id),
          content,
          messageType: 'text',
        }

        // Socket.IO로 실시간 전송
        console.log('Emitting message:', payload)
        socketRef.current.emit('sendMessage', payload)

        // HTTP API로도 메시지 저장 (백업용)
        try {
          await fetch(`/api/chat/rooms/${chatRoomId}/messages`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content,
              senderId: parseInt(session.user.id),
            }),
          })
        } catch (error) {
          console.error('Failed to send message via HTTP API:', error)
        }
      } else {
        console.log('Cannot send message:', {
          hasSocket: !!socketRef.current,
          userId: session?.user?.id,
          chatRoomId,
        })
      }
    },
    [session?.user?.id, chatRoomId],
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
