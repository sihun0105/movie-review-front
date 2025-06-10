import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { useCreateArticleFormContext } from '../hooks/create-article-form-context'
import { Input } from '@/components/ui/input'

interface TitleInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const TitleInputField: FunctionComponent<TitleInputFieldProps> = ({}) => {
  const { form } = useCreateArticleFormContext()
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl className="w-full">
            <Input
              {...field}
              className={cn('w-full rounded border px-3 py-2')}
              placeholder="제목을 입력해주세요."
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { TitleInputField }
