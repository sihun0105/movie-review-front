import { useEffect, useState } from 'react'

export function useArticleRead(articleId: string) {
  const [isRead, setIsRead] = useState(false)

  useEffect(() => {
    const readArticles = JSON.parse(
      typeof window !== 'undefined'
        ? localStorage.getItem('readArticles') || '[]'
        : '[]',
    )
    setIsRead(readArticles.includes(articleId))
  }, [articleId])

  const markAsRead = () => {
    if (typeof window === 'undefined') return
    const readArticles = JSON.parse(
      localStorage.getItem('readArticles') || '[]',
    )
    if (!readArticles.includes(articleId)) {
      localStorage.setItem(
        'readArticles',
        JSON.stringify([...readArticles, articleId]),
      )
      setIsRead(true)
    }
  }

  return { isRead, markAsRead }
}
