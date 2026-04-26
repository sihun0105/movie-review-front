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
              className={cn(
                'w-full resize-none rounded-none border border-dm-line-2 bg-dm-surface text-[13px] text-dm-text placeholder:text-dm-text-faint focus-visible:ring-1 focus-visible:ring-dm-amber focus-visible:ring-offset-0',
                className,
              )}
              placeholder="이 영화에 대해 쓰기..."
              rows={1}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { CommentInputField }
