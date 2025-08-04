'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import useChatSocket from '@/app/(root)/(routes)/(home)/hooks/use-is-socket'

interface ChatMessage {
  id: number
  nickName: string
  message: string
  timestamp?: string
}

interface ChatDialogProps {
  isOpen: boolean
  onClose: () => void
  targetUserId: string
  targetUserName: string
  matchTitle: string
}

const ChatDialog = ({
  isOpen,
  onClose,
  targetUserId,
  targetUserName,
  matchTitle,
}: ChatDialogProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [onlineUsers, setOnlineUsers] = useState<number[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 채널은 작성자 ID와 신청자 ID를 조합해서 생성 (작은 수를 먼저)
  const channelId = parseInt(targetUserId) // 간단하게 targetUserId를 채널로 사용

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

  // 메시지 전송
  const handleSendMessage = () => {
    if (newMessage.trim() && isConnected) {
      sendMessage(newMessage.trim())
      // 내 메시지를 즉시 추가 (임시)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          nickName: '나',
          message: newMessage.trim(),
          timestamp: new Date().toISOString(),
        },
      ])
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b p-4">
          <div>
            <h3 className="text-lg font-semibold">
              {targetUserName}님과의 채팅
            </h3>
            <p className="text-sm text-gray-500">{matchTitle}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        {/* 연결 상태 */}
        <div className="border-b px-4 py-2 text-sm">
          <span
            className={`mr-2 inline-block h-2 w-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          {isConnected ? '연결됨' : '연결 중...'}
          {onlineUsers.length > 0 && (
            <span className="ml-2 text-gray-500">
              온라인: {onlineUsers.length}명
            </span>
          )}
        </div>

        {/* 메시지 영역 */}
        <ScrollArea className="h-96 p-4">
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
                    className={`max-w-xs rounded-lg px-3 py-2 ${
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
              placeholder="메시지를 입력하세요..."
              disabled={!isConnected}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || !isConnected}
            >
              전송
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ChatDialog }
