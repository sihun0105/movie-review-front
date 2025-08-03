import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FunctionComponent, HTMLAttributes } from 'react'
import { useMatchPostFormContext } from '../hooks/match-post-form-context'

interface TitleInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const TitleInputField: FunctionComponent<TitleInputFieldProps> = () => {
  const { form } = useMatchPostFormContext()

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>제목</FormLabel>
          <FormControl>
            <Input {...field} placeholder="모집 글 제목을 입력하세요" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { TitleInputField }
