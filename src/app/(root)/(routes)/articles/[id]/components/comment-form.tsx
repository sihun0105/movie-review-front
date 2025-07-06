'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'
import { useCommentFormContext } from '../hooks/comment-form-context'
import { CommentInputField } from './comment-input-field'
import { useArticleComments } from '../hooks/use-article-comments'
import { useCreateArticleComment } from '../hooks/use-create-article-comment'

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
      {
        comment: data.comment,
        articleId: id,
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
    <div className="">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <CommentInputField className="" />
            <Button
              variant="default"
              type="submit"
              className=""
              disabled={isCreatingComment}
            >
              댓글작성
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { CommentForm }
