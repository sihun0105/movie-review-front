'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import Box from '@/components/ui/box'
import useChatSocket from '@/app/(root)/(routes)/(home)/hooks/use-chat-socket'
import { useMatchPost } from '@/app/(root)/(routes)/match/hooks/use-match-post'

interface ChatMessage {
  id: number
  nickName: string
  message: string
  timestamp?: string
}

interface ChatContainerProps {
  matchId: string
  targetUserId: string
}

const ChatContainer = ({ matchId, targetUserId }: ChatContainerProps) => {
  const router = useRouter()
  const { data: _session, status } = useSession()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState<number[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 매치 정보 조회
  const { matchPost, isLoading: isMatchLoading } = useMatchPost(matchId)

  // 채널은 matchId를 기반으로 생성 (단순히 숫자로 변환)
  const channelId =
    parseInt(matchId) ||
    Math.abs(matchId.split('').reduce((a, b) => a + b.charCodeAt(0), 0))

  const { sendMessage, isConnected } = useChatSocket({
    namespace: 'ws-chat',
    channel: channelId,
    onMessage: (message) => {
      setMessages((prev) => [...prev, message])
    },
    onOnlineList: (users) => {
      setOnlineUsers(users)
    },
  })

  // 로그인 체크
  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // 메시지 전송
  const handleSendMessage = () => {
    if (newMessage.trim() && isConnected) {
      sendMessage(newMessage.trim())
      setNewMessage('')
    }
  }

  // 엔터키로 메시지 전송
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // 스크롤을 항상 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 로딩 중
  if (status === 'loading' || isMatchLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="py-8 text-center">
          <p>로딩 중...</p>
        </div>
      </main>
    )
  }

  // 로그인되지 않은 경우
  if (status === 'unauthenticated') {
    return null
  }

  // 매치 정보가 없는 경우
  if (!matchPost) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="py-8 text-center">
          <h1 className="text-2xl font-bold text-red-600">오류</h1>
          <p className="text-gray-600">매치 정보를 찾을 수 없습니다.</p>
          <Button onClick={() => router.push('/match')} className="mt-4">
            매치 목록으로
          </Button>
        </div>
      </main>
    )
  }

  const targetUserName =
    matchPost.userno.toString() === targetUserId
      ? matchPost.author
      : `사용자 ${targetUserId}`

  return (
    <main className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.push(`/match/${matchId}`)}
          className="mb-4"
        >
          ← 매치로 돌아가기
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{targetUserName}님과의 채팅</h1>
          <p className="mt-1 text-gray-600">매치: {matchPost.title}</p>
        </div>
      </div>

      {/* 채팅 영역 */}
      <Box className="flex h-[600px] flex-col">
        {/* 연결 상태 */}
        <div className="border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span
                className={`mr-2 inline-block h-2 w-2 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="text-sm">
                {isConnected ? '연결됨' : '연결 중...'}
              </span>
            </div>
            {onlineUsers.length > 0 && (
              <span className="text-sm text-gray-500">
                온라인: {onlineUsers.length}명
              </span>
            )}
          </div>
        </div>

        {/* 메시지 영역 */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                아직 메시지가 없습니다.
                <br />첫 메시지를 보내보세요!
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.nickName === '나' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-3 ${
                      message.nickName === '나'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <div className="mb-1 text-sm font-medium">
                      {message.nickName}
                    </div>
                    <div className="break-words">{message.message}</div>
                    {message.timestamp && (
                      <div className="mt-1 text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString(
                          'ko-KR',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* 메시지 입력 */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isConnected ? '메시지를 입력하세요...' : '연결 중입니다...'
              }
              disabled={!isConnected}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || !isConnected}
            >
              전송
            </Button>
          </div>
        </div>
      </Box>
    </main>
  )
}

export { ChatContainer }
