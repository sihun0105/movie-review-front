import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

const useIsLogin = (
  socket: Socket | null,
  id: number | undefined | null,
  channels: number[],
) => {
  useEffect(() => {
    if (socket) {
      socket.emit('login', { id, channels })

      socket.on('onlineList', (onlineList) => {
        console.log('Online List:', onlineList)
      })
      return () => {
        socket.off('onlineList')
      }
    }
  }, [id, channels])
}

export default useIsLogin
