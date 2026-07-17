'use client'

import { Reply } from '@/lib/type'
import { MessageCircle, Pencil, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DmUserAvatar } from './dm-user-avatar'

interface DmReviewCardProps {
  reply: Reply
  userId?: number | string
  onModify?: (_reply: Reply) => void
  onDelete?: (_reply: Reply) => void
  onReply?: (_reply: Reply) => void
  nested?: boolean
}

function formatWhen(input: Date | string | undefined): string {
  if (!input) return ''
  const d = typeof input === 'string' ? new Date(input) : input
  const diffMs = Date.now() - d.getTime()
  const min = Math.floor(diffMs / 60000)
  if (min < 1) return '방금 전'
  if (min < 60) return `${min}분 전`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}시간 전`
  const day = Math.floor(hr / 24)
  if (day < 7) return `${day}일 전`
  return d.toLocaleDateString('ko-KR')
}

export function DmReviewCard({
  reply,
  userId,
  onModify,
  onDelete,
  onReply,
  nested = false,
}: DmReviewCardProps) {
  if (!reply) return null
  const isOwner = userId !== undefined && +userId === reply.userno

  return (
    <article
      className={cn('border-b border-border py-3', nested && 'border-l pl-3')}
    >
      <header className="flex items-center gap-2">
        <DmUserAvatar
          name={reply.nickname}
          image={reply.avatar}
          className="h-7 w-7"
        />
        <span className="text-[13px] font-medium text-foreground">
          {reply.nickname}
        </span>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">
          {formatWhen(reply.updatedAt)}
        </span>
        {isOwner && (
          <span className="flex gap-2">
            {onModify && (
              <button
                type="button"
                aria-label="수정"
                onClick={() => onModify(reply)}
                className="text-muted-foreground transition hover:text-foreground"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                aria-label="삭제"
                onClick={() => onDelete(reply)}
                className="text-muted-foreground transition hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </span>
        )}
      </header>
      <p className="mt-1.5 break-keep text-[13px] leading-relaxed text-foreground">
        {reply.content}
      </p>
      {onReply && !nested && (
        <button
          type="button"
          onClick={() => onReply(reply)}
          className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          답글
        </button>
      )}
    </article>
  )
}
