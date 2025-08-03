import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { FunctionComponent, HTMLAttributes } from 'react'
import { useMatchPostFormContext } from '../hooks/match-post-form-context'

interface ContentInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const ContentInputField: FunctionComponent<ContentInputFieldProps> = () => {
  const { form } = useMatchPostFormContext()

  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>내용</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder="모집 내용을 입력하세요"
              rows={4}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { ContentInputField }
