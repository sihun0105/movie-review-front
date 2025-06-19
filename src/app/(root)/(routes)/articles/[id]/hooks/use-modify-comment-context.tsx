'use client'

import { createContext, useContext, useState } from 'react'

interface ModifyCommentModalContextProps {
  open: boolean
  setOpen: (_: boolean) => void
  setReplyId: (_: number) => void
  replyId: number
  setComment: (_: string) => void
  comment: string
}

const ModifyCommentModalContext =
  createContext<ModifyCommentModalContextProps | null>(null)

export const useModifyCommentModalContext = () => {
  const context = useContext(ModifyCommentModalContext)
  if (!context) {
    throw new Error(
      'useModifyCommentModalContext must be used within a ModifyCommentModalContextProvider',
    )
  }
  return context
}

export const ModifyCommentModalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const [replyId, setReplyId] = useState(0)
  const [comment, setComment] = useState('')

  return (
    <ModifyCommentModalContext.Provider
      value={{ open, setOpen, replyId, setReplyId, comment, setComment }}
    >
      {children}
    </ModifyCommentModalContext.Provider>
  )
}
