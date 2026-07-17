'use client'

import { Reply } from '@/lib/type'
import { FormEvent, useState } from 'react'
import { useArticleComments } from '../hooks/use-article-comments'
import { useCreateArticleComment } from '../hooks/use-create-article-comment'

interface ReplyCommentFormProps {
  articleId: string
  parent: Reply
  onClose: () => void
}

export function ReplyCommentForm({
  articleId,
  parent,
  onClose,
}: ReplyCommentFormProps) {
  const [comment, setComment] = useState('')
  const { mutate } = useArticleComments()
  const { createComment, isCreatingComment } = useCreateArticleComment(mutate)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!comment.trim()) return
    createComment(
      { articleId, comment: comment.trim(), parentId: parent.id },
      { onSuccess: onClose },
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="ml-9 border-l border-border py-3 pl-3"
    >
      <label className="mb-2 block text-[11px] text-muted-foreground">
        {parent.nickname}님에게 답글
      </label>
      <div className="flex gap-2">
        <input
          autoFocus
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="답글을 입력해주세요."
          className="h-9 min-w-0 flex-1 rounded-md border border-border bg-secondary px-3 text-[13px] outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={!comment.trim() || isCreatingComment}
          className="h-9 rounded-md bg-primary px-3 text-[12px] text-primary-foreground disabled:opacity-50"
        >
          등록
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-1 text-[12px] text-muted-foreground"
        >
          취소
        </button>
      </div>
    </form>
  )
}
