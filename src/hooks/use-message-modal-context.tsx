'use client'

import { createContext, useContext, useState } from 'react'

interface MessageModalContextProps {
  open: boolean
  setOpen: (_: boolean) => void
}

const MessageModalContext = createContext<MessageModalContextProps | null>(null)

export const useMessageModalContext = () => {
  const context = useContext(MessageModalContext)
  if (!context) {
    throw new Error(
      'useMessageModalContext must be used within a UpdateMessageModalContextProvider',
    )
  }
  return context
}

export const MessageModalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)

  return (
    <MessageModalContext.Provider value={{ open, setOpen }}>
      {children}
    </MessageModalContext.Provider>
  )
}
