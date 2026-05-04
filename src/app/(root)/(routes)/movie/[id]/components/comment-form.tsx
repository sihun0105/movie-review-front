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
        <div className="flex justify-end border-t border-border px-3 py-2">
          <button
            type="submit"
            disabled={isCreatingComment}
            className="h-8 rounded-md bg-primary px-4 font-mono text-[12px] text-primary-foreground disabled:opacity-50"
          >
            {isCreatingComment ? '등록 중...' : '등록'}
          </button>
        </div>
      </form>
    </Form>
  )
}

export { CommentForm }
