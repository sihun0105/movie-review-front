import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { FunctionComponent } from 'react'
import { useCreateArticleFormContext } from '../hooks/create-article-form-context'

const TitleInputField: FunctionComponent = () => {
  const { form } = useCreateArticleFormContext()
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <input
              {...field}
              type="text"
              placeholder="제목을 입력해주세요."
              className="w-full border border-border bg-secondary px-3.5 py-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-yellow-400 focus:outline-none"
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { TitleInputField }
