'use client'

import { Article } from '@/lib/type'
import { Eye, MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { articlePreview, isRecentArticle } from './article-card-presenter'

interface ArticleCardProps {
  article: Article
}

const ArticleCard: FunctionComponent<ArticleCardProps> = ({ article }) => {
  const preview = articlePreview(article.content)

  return (
    <Link
      href={`/articles/${article.id}`}
      className="block border-b border-border px-4 py-3.5 hover:bg-secondary"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="flex-1 truncate text-[15px] font-semibold text-foreground">
          {article.title}
          {isRecentArticle(article.createdAt) && (
            <span className="ml-2 inline-block rounded bg-primary/20 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.5px] text-primary">
              NEW
            </span>
          )}
        </h2>
      </div>

      <p className="mt-0.5 line-clamp-1 text-[12px] text-muted-foreground">
        {preview || '내용 미리보기가 없습니다.'}
      </p>

      <div className="mt-2 flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
        <div className="flex min-w-0 items-center gap-2 overflow-hidden">
          <span className="truncate">{article.author}</span>
          <span>·</span>
          <span className="shrink-0">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2.5">
          <span className="flex items-center gap-1" aria-label={`조회수 ${article.viewCount}`}>
            <Eye className="h-3 w-3" aria-hidden="true" />
            {article.viewCount}
          </span>
          <span className="flex items-center gap-1" aria-label={`좋아요 ${article.likeCount}`}>
            <ThumbsUp className="h-3 w-3" aria-hidden="true" />
            {article.likeCount}
          </span>
          <span className="flex items-center gap-1" aria-label={`싫어요 ${article.dislikeCount}`}>
            <ThumbsDown className="h-3 w-3" aria-hidden="true" />
            {article.dislikeCount}
          </span>
          <span className="flex items-center gap-1" aria-label={`댓글 ${article.commentCount}`}>
            <MessageCircle className="h-3 w-3" aria-hidden="true" />
            {article.commentCount}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
