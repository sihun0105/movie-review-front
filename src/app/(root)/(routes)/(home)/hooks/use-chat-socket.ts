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
  namespace,
  chatRoomId,
  onMessage,
  onOnlineList,
}: UseChatSocketProps = {}) => {
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { data: session } = useSession()

  // 네임스페이스 결정: chatRoomId가 있으면 해당 채팅방, 없으면 일반 채팅
  const actualNamespace =
    namespace || (chatRoomId ? `ws-chat-${chatRoomId}` : 'ws-chat')

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
      socketRef.current = io(
        `${process.env.NEXT_PUBLIC_CHAT_SERVER_API}/${actualNamespace}`,
        {
          transports: ['websocket', 'polling'],
        },
      )

      // 연결 이벤트 리스너 등록
      socketRef.current.on('connect', () => {
        setIsConnected(true)
      })

      socketRef.current.on('disconnect', () => {
        setIsConnected(false)
      })

      socketRef.current.on('hello', (_namespaceName: string) => {})

      socketRef.current.on('message', (message: ChatMessageEntity) => {
        if (onMessageRef.current) {
          onMessageRef.current(message)
        }
      })

      socketRef.current.on('onlineList', (users: number[]) => {
        if (onOnlineListRef.current) {
          onOnlineListRef.current(users)
        }
      })

      socketRef.current.on('error', (error: any) => {
        console.error('Socket error:', error)
      })
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
        setIsConnected(false)
      }
    }
  }, [actualNamespace])

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
    (content: string) => {
      if (socketRef.current && session?.user?.id && chatRoomId) {
        const payload = {
          chatRoomId,
          senderId: parseInt(session.user.id),
          content,
          messageType: 'text',
        }

        socketRef.current.emit('sendMessage', payload)
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
