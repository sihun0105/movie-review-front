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
        <FormItem>
          <FormControl>
            <textarea
              {...field}
              rows={3}
              placeholder="이 영화에 대해 쓰기..."
              className="w-full resize-none bg-transparent px-3 py-3 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { CommentInputField }
