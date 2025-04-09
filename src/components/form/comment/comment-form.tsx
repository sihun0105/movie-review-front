'use client'

import { Form } from '@/components/ui/form'
import { FunctionComponent, HTMLAttributes } from 'react'
import { Button } from '@/components/ui/button'
import { useCommentFormContext } from './hook/comment-form-context'
import { CommentInputField } from './fields/comment-input-field'
import { useCreateComment } from './hook/use-create-comment'
import { useRouter } from 'next/navigation'

interface CommentFormProps extends HTMLAttributes<HTMLDivElement> {
  id: string
}

const CommentForm: FunctionComponent<CommentFormProps> = ({ id }) => {
  const { form } = useCommentFormContext()
  const { createComment, isCreatingComment } = useCreateComment(id)
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
            <div className="w-[100px]">
              <Button
                variant="default"
                type="submit"
                className="w-full"
                disabled={isCreatingComment}
              >
                완료
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { CommentForm }
