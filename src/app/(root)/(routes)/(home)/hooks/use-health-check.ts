'use client'
import { useState, useEffect } from 'react'
import { Socket } from 'socket.io-client'

const useHealthCheck = (socket: Socket | null): boolean => {
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (socket) {
        socket.emit('health')
        socket.once('pong', () => {
          setIsConnected(true)
        })
        setTimeout(() => {
          setIsConnected(false)
        }, 5000) // 5초 내에 응답이 없으면 연결 끊김으로 간주
      }
    }, 5000) // 5초마다 헬스체크

    return () => clearInterval(interval)
  }, [socket])

  return isConnected
}

export default useHealthCheck
