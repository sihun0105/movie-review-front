'use client'

import useIsLogin from '@/app/(root)/(routes)/(home)/hooks/use-is-login'
import useIsSocket from '@/app/(root)/(routes)/(home)/hooks/use-is-socket'
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble'
import { ChatInput } from '@/components/ui/chat/chat-input'
import { ChatMessageList } from '@/components/ui/chat/chat-message-list'
import {
  ExpandableChat,
  ExpandableChatBody,
  ExpandableChatFooter,
  ExpandableChatHeader,
} from '@/components/ui/chat/expandable-chat'
import { Send } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '../ui/button'
import CodeDisplayBlock from './code-display-block'
import { useGetChatHistory } from '@/hooks/use-is-chathistroy'
import { v4 as uuidv4 } from 'uuid'

export default function ChatSupport() {
  const { data: session } = useSession()
  const [input, setInput] = useState('')
  const { data = [] } = useGetChatHistory('2025-01-01')
  const userData = session?.user ?? {
    id: uuidv4(),
    nickname: 'Guest',
    provider: '',
    email: '',
    name: '',
    phone: '',
  }
  const [messages, setMessages] = useState<
    { nickName: string; message: string }[]
  >([])
  const socket = useIsSocket()
  const [isComposing, setIsComposing] = useState(false)

  useIsLogin(socket, Number(userData.id) ?? 0, [1])

  const sendMessage = (msg: string) => {
    const nickName = userData.nickname || 'Anonymous'
    if (socket) {
      socket.emit('message', {
        channel: 1,
        userId: userData.id,
        message: msg,
      })
      setMessages((prevChat) => [
        ...prevChat,
        { nickName: nickName, message: msg },
      ])
      setInput('')
    }
  }
  useEffect(() => {
    if (socket) {
      socket.on('message', (msg: { nickName: string; message: string }) => {
        setMessages((prevChat) => [...prevChat, msg])
      })

      return () => {
        socket.off('message')
      }
    }
  }, [socket])
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }
  const messagesRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage(input)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault()
      if (!input) return
      onSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const handleComposition = (
    e: React.CompositionEvent<HTMLTextAreaElement>,
  ) => {
    if (e.type === 'compositionstart') {
      setIsComposing(true)
    } else if (e.type === 'compositionend') {
      setIsComposing(false)
    }
  }

  return (
    <ExpandableChat size="md" position="bottom-right">
      <ExpandableChatHeader className="flex-col justify-center bg-muted/60 text-center">
        <h1 className="text-xl font-semibold">채팅</h1>
        <p>채팅</p>
        <div className="flex items-center gap-2 pt-2"></div>
      </ExpandableChatHeader>
      <ExpandableChatBody>
        <ChatMessageList className="bg-muted/25" ref={messagesRef}>
          {data &&
            data.map((message, index) => (
              <ChatBubble
                key={index}
                variant={
                  message.nickname == userData.nickname ? 'sent' : 'received'
                }
              >
                <ChatBubbleAvatar
                  src=""
                  fallback={message.nickname == userData.nickname ? '👨🏽' : '🤖'}
                />
                <ChatBubbleMessage
                  variant={
                    message.nickName == userData.nickname ? 'sent' : 'received'
                  }
                >
                  {message.content
                    .split('```')
                    .map((part: string, index: number) => {
                      if (index % 2 === 0) {
                        return (
                          <Markdown key={index} remarkPlugins={[remarkGfm]}>
                            {part}
                          </Markdown>
                        )
                      } else {
                        return (
                          <pre className=" pt-2" key={index}>
                            <CodeDisplayBlock code={part} lang="" />
                          </pre>
                        )
                      }
                    })}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}

          {/* Messages */}
          {messages &&
            messages.map((message, index) => (
              <ChatBubble
                key={index}
                variant={
                  message.nickName == userData.nickname ? 'sent' : 'received'
                }
              >
                <ChatBubbleAvatar
                  src=""
                  fallback={message.nickName == userData.nickname ? '👨🏽' : '🤖'}
                />
                <ChatBubbleMessage
                  variant={
                    message.nickName == userData.nickname ? 'sent' : 'received'
                  }
                >
                  {message.message
                    .split('```')
                    .map((part: string, index: number) => {
                      if (index % 2 === 0) {
                        return (
                          <Markdown key={index} remarkPlugins={[remarkGfm]}>
                            {part}
                          </Markdown>
                        )
                      } else {
                        return (
                          <pre className=" pt-2" key={index}>
                            <CodeDisplayBlock code={part} lang="" />
                          </pre>
                        )
                      }
                    })}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter className="bg-muted/25">
        <form ref={formRef} className="relative flex gap-2" onSubmit={onSubmit}>
          <ChatInput
            value={input}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            onCompositionStart={handleComposition}
            onCompositionEnd={handleComposition}
            className="min-h-12 bg-background shadow-none "
          />
          <Button
            className="absolute right-2 top-1/2 -translate-y-1/2  transform"
            type="submit"
            size="icon"
            disabled={!input}
          >
            <Send className="size-4" />
          </Button>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  )
}
