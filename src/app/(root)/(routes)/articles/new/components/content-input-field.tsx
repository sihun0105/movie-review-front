import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { FunctionComponent, HTMLAttributes } from 'react'
import { useCreateArticleFormContext } from '../hooks/create-article-form-context'

interface ContentInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const ContentInputField: FunctionComponent<ContentInputFieldProps> = ({}) => {
  const { form } = useCreateArticleFormContext()
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl className="w-full">
            <Textarea
              {...field}
              className={cn('min-h-[200px] w-full rounded border px-3 py-2')}
              placeholder="내용을 입력해주세요."
              rows={1}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { ContentInputField }
