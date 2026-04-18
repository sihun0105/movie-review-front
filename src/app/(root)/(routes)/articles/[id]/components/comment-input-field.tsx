import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { useCommentFormContext } from '../hooks/comment-form-context'

interface CommentInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const CommentInputField: FunctionComponent<CommentInputFieldProps> = ({
  className,
  ...props
}) => {
  const { form } = useCommentFormContext()
  return (
    <FormField
      control={form.control}
      name="comment"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl className="w-full">
            <Textarea
              {...field}
              className={cn('w-full', 'resize-none')}
              placeholder="댓글을 입력해주세요."
              rows={1}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { CommentInputField }
