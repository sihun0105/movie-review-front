'use client'

import { createContext, useContext, useState } from 'react'

interface VodModalContextProps {
  open: boolean
  setOpen: (_: boolean) => void
  src: string
  setSrc: (_: string) => void
  title: string
  setTitle: (_: string) => void
}

const VodModalContext = createContext<VodModalContextProps | null>(null)

export const useVodModalContext = () => {
  const context = useContext(VodModalContext)
  if (!context) {
    throw new Error(
      'useVodModalContext must be used within a UpdateVodModalContextProvider',
    )
  }
  return context
}

export const VodModalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState('')
  const [title, setTitle] = useState('')

  return (
    <VodModalContext.Provider
      value={{ open, setOpen, src, setSrc, title, setTitle }}
    >
      {children}
    </VodModalContext.Provider>
  )
}
