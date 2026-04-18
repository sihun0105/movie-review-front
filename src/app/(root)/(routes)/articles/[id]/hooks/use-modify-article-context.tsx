'use client'

import { createContext, useContext, useState } from 'react'
import { Article } from '@/lib/type'

interface ModifyArticleModalContextProps {
  open: boolean
  setOpen: (open: boolean) => void
  article: Article | null
  setArticle: (article: Article | null) => void
}

const ModifyArticleModalContext =
  createContext<ModifyArticleModalContextProps | null>(null)

export const useModifyArticleModalContext = () => {
  const context = useContext(ModifyArticleModalContext)
  if (!context) {
    throw new Error(
      'useModifyArticleModalContext must be used within a ModifyArticleModalContextProvider',
    )
  }
  return context
}

export const ModifyArticleModalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const [article, setArticle] = useState<Article | null>(null)

  return (
    <ModifyArticleModalContext.Provider
      value={{ open, setOpen, article, setArticle }}
    >
      {children}
    </ModifyArticleModalContext.Provider>
  )
}
