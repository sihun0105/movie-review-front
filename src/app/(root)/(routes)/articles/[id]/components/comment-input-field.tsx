import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { FunctionComponent } from 'react'
import { useCommentFormContext } from '../hooks/comment-form-context'

const CommentInputField: FunctionComponent = () => {
  const { form } = useCommentFormContext()
  return (
    <FormField
      control={form.control}
      name="comment"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormControl>
            <textarea
              {...field}
              rows={1}
              placeholder="댓글을 입력해주세요."
              className="w-full resize-none border border-border bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { CommentInputField }
