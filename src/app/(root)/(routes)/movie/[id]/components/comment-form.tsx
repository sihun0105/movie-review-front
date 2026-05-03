'use client'

import { Form } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'
import { useCommentFormContext } from '../hooks/comment-form-context'
import { useComments } from '../hooks/use-comments'
import { CommentInputField } from './comment-input-field'

interface CommentFormProps {
  id: string
}

const CommentForm: FunctionComponent<CommentFormProps> = ({ id }) => {
  const { form } = useCommentFormContext()
  const { createComment, isCreatingComment } = useComments()
  const router = useRouter()

  const handleSubmit = form.handleSubmit((data) => {
    createComment(
      { comment: data.comment, movieId: id },
      {
        onSuccess: () => {
          form.reset()
          router.refresh()
        },
      },
    )
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <CommentInputField />
        <div className="flex justify-end border-t border-dm-line px-3 py-2">
          <button
            type="submit"
            disabled={isCreatingComment}
            className="bg-dm-red px-4 py-1.5 font-dm-mono text-[11px] uppercase tracking-[0.5px] text-white disabled:bg-dm-surface-2 disabled:text-dm-text-faint"
          >
            {isCreatingComment ? '등록 중...' : '등록 →'}
          </button>
        </div>
      </form>
    </Form>
  )
}

export { CommentForm }
