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

  const handleSubmit = form.handleSubmit(async (data) => {
    await createComment(
      {
        comment: data.comment,
        movieId: id,
      },
      {
        onSuccess: async () => {
          alert('성공적으로 등록되었습니다.')
          form.reset()
          router.refresh()
        },
        onError: () => {
          alert('등록에 실패하였습니다.')
        },
      },
    )
  })
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <CommentInputField className="flex-grow" />
            <div className="w-[100px]">
              <Button
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
