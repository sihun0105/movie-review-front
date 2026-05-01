'use client'

import { useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'
import { useArticleComments } from '../hooks/use-article-comments'
import { useCommentFormContext } from '../hooks/comment-form-context'
import { useCreateArticleComment } from '../hooks/use-create-article-comment'
import { CommentInputField } from './comment-input-field'

interface CommentFormProps {
  id: string
}

const CommentForm: FunctionComponent<CommentFormProps> = ({ id }) => {
  const { form } = useCommentFormContext()
  const { mutate } = useArticleComments()
  const { createComment, isCreatingComment } = useCreateArticleComment(mutate)
  const router = useRouter()

  const handleSubmit = form.handleSubmit((data) => {
    createComment(
      { comment: data.comment, articleId: id },
      {
        onSuccess: () => {
          form.reset()
          router.refresh()
        },
      },
    )
  })

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <CommentInputField />
      <button
        type="submit"
        disabled={isCreatingComment}
        className="shrink-0 bg-dm-red px-3 py-2 font-dm-mono text-[11px] uppercase tracking-[0.5px] text-white disabled:bg-dm-surface-2 disabled:text-dm-text-faint"
      >
        등록
      </button>
    </form>
  )
}

export { CommentForm }
