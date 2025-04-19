import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
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
            <Input
              {...field}
              className={cn('w-full')}
              placeholder="댓글을 입력해주세요."
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { CommentInputField }
