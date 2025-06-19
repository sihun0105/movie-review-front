import { FunctionComponent } from 'react'
import { Form } from '@/components/ui/form'
import ModifyCommentFormField from './modify-comment-comment-field'
import { Button } from '@/components/ui/button'
import { useModifyCommentModalContext } from '../hooks/use-modify-comment-context'
import { useModifyCommentFormContext } from '../hooks/modify-comment-context'
import { useArticleComments } from '../hooks/use-comments'
interface ModifyCommentFormProps {}

const ModifyCommentForm: FunctionComponent<ModifyCommentFormProps> = ({}) => {
  const { replyId, setOpen } = useModifyCommentModalContext()
  const { form } = useModifyCommentFormContext()
  const { modifyComment, isModifyingComment } = useArticleComments()
  const handleSubmit = form.handleSubmit((data) => {
    modifyComment(
      {
        comment: data.comment,
        commentId: replyId,
      },
      {
        onSuccess: () => {
          setOpen(false)
          form.reset()
        },
      },
    )
  })
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <ModifyCommentFormField />
          <Button
            variant="default"
            type="submit"
            className="w-full"
            disabled={isModifyingComment}
          >
            댓글 수정
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ModifyCommentForm
