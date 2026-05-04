'use client'

import { Article } from '@/lib/type'
import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { useArticleRead } from '../hooks/use-article-read'

interface ArticleCardProps {
  article: Article
}

const ArticleCard: FunctionComponent<ArticleCardProps> = ({ article }) => {
  const { isRead, markAsRead } = useArticleRead(article.id)

  return (
    <Link
      href={`/articles/${article.id}`}
      onClick={markAsRead}
      className="block border-b border-border px-4 py-3.5 hover:bg-secondary"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="flex-1 truncate text-[15px] font-semibold text-foreground">
          {article.title}
          {!isRead && (
            <span className="ml-2 inline-block rounded bg-primary/20 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.5px] text-primary">
              NEW
            </span>
          )}
        </h2>
      </div>

      <p className="mt-0.5 line-clamp-1 text-[12px] text-muted-foreground">
        {article.content}
      </p>

      <div className="mt-2 flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
        <span>{article.author}</span>
        <span>·</span>
        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            {article.likeCount}
          </span>
          <span className="flex items-center gap-1">
            <ThumbsDown className="h-3 w-3" />
            {article.dislikeCount}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            {article.commentCount}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
