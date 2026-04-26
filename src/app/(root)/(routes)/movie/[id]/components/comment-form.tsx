'use client'

import { Button } from '@/components/ui/button'
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
      {
        comment: data.comment,
        movieId: id,
      },
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
        <div className="flex w-full flex-row items-center gap-2">
          <CommentInputField />
          <Button
            type="submit"
            disabled={isCreatingComment}
            className="rounded-none border border-dm-red bg-dm-red px-3 text-[12px] font-semibold text-white hover:bg-dm-red-deep"
          >
            등록
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { CommentForm }
