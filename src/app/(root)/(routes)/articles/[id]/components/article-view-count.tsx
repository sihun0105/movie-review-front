'use client'

import { ArticleViewClientApiEndpoint } from '@/config/article-view-client-api-endpoint'
import { Eye } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ArticleViewCountProps {
  articleId: string
  initialCount: number
}

export const ArticleViewCount = ({
  articleId,
  initialCount,
}: ArticleViewCountProps) => {
  const [viewCount, setViewCount] = useState(initialCount)

  useEffect(() => {
    let active = true
    const recordView = async () => {
      try {
        const response = await fetch(
          ArticleViewClientApiEndpoint.record(Number(articleId)),
          { method: 'POST' },
        )
        if (!response.ok) return
        const result = await response.json()
        if (active && typeof result.viewCount === 'number') {
          setViewCount(result.viewCount)
        }
      } catch {
        // 조회 기록 실패는 콘텐츠 열람을 방해하지 않는다.
      }
    }
    void recordView()
    return () => {
      active = false
    }
  }, [articleId])

  return (
    <span className="flex items-center gap-1" aria-label={`조회 ${viewCount}`}>
      <Eye className="h-3 w-3" />
      {viewCount}
    </span>
  )
}
