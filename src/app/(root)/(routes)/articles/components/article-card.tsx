'use client'

import { Article } from '@/lib/type'
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react'
import { FunctionComponent } from 'react'
import Link from 'next/link'

interface ArticleCardProps {
  article: Article
}

const ArticleCard: FunctionComponent<ArticleCardProps> = ({ article }) => {
  return (
    <div className="rounded-2xl border p-4 shadow-sm transition hover:shadow-md">
      <Link href={`/articles/${article.id}`}>
        <div>
          <h2 className="mb-1 text-lg font-semibold hover:underline">
            {article.title}
          </h2>
          <p className="mb-2 text-sm text-gray-500">작성자: {article.author}</p>
          <p className="mb-3 line-clamp-2 text-sm text-gray-700">
            {article.content}
          </p>
        </div>
      </Link>
      <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <ThumbsUp className="h-4 w-4" /> {article.likeCount}
        </div>
        <div className="flex items-center gap-1">
          <ThumbsDown className="h-4 w-4" /> {article.dislikeCount}
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" /> {article.commentCount}
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
