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
    <div className="w-3/4">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <CommentInputField className="flex-grow" />
            <Button
              variant="default"
              type="submit"
              className="w-full"
              disabled={isCreatingComment}
            >
              완료
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { CommentForm }
