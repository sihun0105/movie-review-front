'use client'

import { Reply } from '@/lib/type'
import { Pencil, X } from 'lucide-react'

interface DmReviewCardProps {
  reply: Reply
  userId?: number | string
  onModify?: (reply: Reply) => void
  onDelete?: (reply: Reply) => void
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
}: DmReviewCardProps) {
  if (!reply) return null
  const initial = reply.nickname?.trim().charAt(0).toUpperCase() ?? '?'
  const isOwner = userId !== undefined && +userId === reply.userno

  return (
    <article className="border-b border-dm-line py-3">
      <header className="flex items-center gap-2">
        <span
          aria-hidden
          className="flex h-7 w-7 items-center justify-center rounded-full border border-dm-line-2 bg-dm-surface-2 text-[11px] font-bold text-dm-text"
        >
          {initial}
        </span>
        <span className="text-[13px] font-semibold text-dm-text">
          {reply.nickname}
        </span>
        <span className="ml-auto font-dm-mono text-[10px] text-dm-text-faint">
          {formatWhen(reply.updatedAt)}
        </span>
        {isOwner && (
          <span className="flex gap-2">
            {onModify && (
              <button
                type="button"
                aria-label="수정"
                onClick={() => onModify(reply)}
                className="text-dm-text-faint transition hover:text-dm-amber"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                aria-label="삭제"
                onClick={() => onDelete(reply)}
                className="text-dm-text-faint transition hover:text-dm-red"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </span>
        )}
      </header>
      <p className="mt-1.5 break-keep text-[13px] leading-[1.6] text-dm-text">
        {reply.content}
      </p>
    </article>
  )
}
