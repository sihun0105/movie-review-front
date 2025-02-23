'use client'
import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

const useIsSocket = (): Socket => {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    socketRef.current = io('https://drunkenmovie.shop/ws-home', {
      transports: ['websocket', 'polling'],
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

  return socketRef.current as Socket
}

export default useIsSocket
