'use client'
import { FunctionComponent, useState, useEffect } from 'react'
import useIsSocket from '../hooks/use-is-socket'
import { useSession } from 'next-auth/react'

interface ChatSectionProps {}

const ChatSection: FunctionComponent<ChatSectionProps> = ({}) => {
  const { data } = useSession()
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<string[]>([])
  const socket = useIsSocket()
  //   const isConnected = useHealthCheck(socket)

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', { channel: 1, userId: data?.user.id, message })
      setMessage('')
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('message', (msg: string) => {
        console.log(msg)
        setChat((prevChat) => [...prevChat, msg])
      })

      return () => {
        socket.off('message')
      }
    }
  }, [socket])

  return (
    <main>
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
