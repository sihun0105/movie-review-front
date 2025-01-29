'use client'
import { FunctionComponent, useState, useEffect } from 'react'
import useIsSocket from '../hooks/use-is-socket'
import useHealthCheck from '../hooks/use-health-check'
import { useSession } from 'next-auth/react'

interface ChatSectionProps {}

const ChatSection: FunctionComponent<ChatSectionProps> = ({}) => {
  const { data } = useSession()
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<string[]>([])
  const socket = useIsSocket()
  const isConnected = useHealthCheck(socket)

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', { channel: 1, userId: data?.user.id, message })
      setMessage('')
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('message', (msg: string) => {
        setChat((prevChat) => [...prevChat, msg])
      })

      return () => {
        socket.off('message')
      }
    }
  }, [socket])

  return (
    <main>
      <div>{isConnected ? 'Connected' : 'Disconnected'}</div>
      <div>
        {chat.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </main>
  )
}

export default ChatSection
