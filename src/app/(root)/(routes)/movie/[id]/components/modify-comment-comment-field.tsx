import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FunctionComponent } from 'react'
import { useModifyCommentFormContext } from '../hooks/modify-comment-context'
interface ModifyCommentFormFieldProps {}

const ModifyCommentFormField: FunctionComponent<
  ModifyCommentFormFieldProps
> = ({}) => {
  const { form } = useModifyCommentFormContext()

  return (
    <FormField
      control={form.control}
      name="comment"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input {...field} placeholder={'댓글을 입력해주세요.'} />
          </FormControl>
          <div className="h-10">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}

export default ModifyCommentFormField
