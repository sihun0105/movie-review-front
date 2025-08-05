'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { ChatRoomEntity, ChatMessageEntity } from '@/modules/chat'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return await response.json()
}

export const useChatRoom = (matchId: string, targetUserId: string) => {
  const { data: session } = useSession()
  const [chatRoom, setChatRoom] = useState<ChatRoomEntity | null>(null)
  const [messages, setMessages] = useState<ChatMessageEntity[]>([])
  const [error, setError] = useState<string | null>(null)

  // 1:1 채팅방 생성/조회 API 호출
  const createDirectChatUrl = session?.user?.id
    ? AppClientApiEndpoint.createDirectChat()
    : null

  const { data: directChatData, error: directChatError } = useSWR(
    createDirectChatUrl,
    () => {
      if (!session?.user?.id) return null

      return fetch(AppClientApiEndpoint.createDirectChat(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUserId: parseInt(session.user.id),
          targetUserId: parseInt(targetUserId),
          targetUserName: `Match Chat - ${matchId}`,
        }),
      }).then((res) => {
        if (!res.ok) throw new Error('Failed to create/find direct chat')
        return res.json()
      })
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    },
  )

  // 메시지 조회
  const messagesUrl =
    chatRoom?.chatRoomId && session?.user?.id
      ? AppClientApiEndpoint.getChatMessages(
          chatRoom.chatRoomId,
          parseInt(session.user.id),
        )
      : null

  const {
    data: messagesData,
    error: messagesError,
    mutate: mutateMessages,
  } = useSWR(messagesUrl, fetcher, {
    refreshInterval: 3000, // 3초마다 새로고침
    revalidateOnFocus: true,
  })

  // 채팅방 데이터 설정
  useEffect(() => {
    if (directChatData?.chatRoom) {
      setChatRoom(directChatData.chatRoom)
    }
  }, [directChatData])

  // 메시지 데이터 설정
  useEffect(() => {
    if (messagesData?.messages) {
      setMessages(messagesData.messages)
    }
  }, [messagesData])

  // 에러 처리
  useEffect(() => {
    if (directChatError || messagesError) {
      setError('채팅방을 불러오는데 실패했습니다.')
    } else {
      setError(null)
    }
  }, [directChatError, messagesError])

  // 새 메시지 추가
  const addMessage = (message: ChatMessageEntity) => {
    setMessages((prev) => [...prev, message])
  }

  // 메시지 리로드
  const reloadMessages = () => {
    mutateMessages()
  }

  return {
    chatRoom,
    messages,
    loading: !directChatData && !directChatError,
    error,
    addMessage,
    reloadMessages,
  }
}
