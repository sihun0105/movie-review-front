import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { FunctionComponent } from 'react'
import { useCreateArticleFormContext } from '../hooks/create-article-form-context'

const ContentInputField: FunctionComponent = () => {
  const { form } = useCreateArticleFormContext()
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <textarea
              {...field}
              rows={10}
              placeholder="내용을 입력해주세요."
              className="w-full resize-none border border-dm-line-2 bg-dm-surface px-3.5 py-3 text-[14px] text-dm-text placeholder:text-dm-text-faint focus:border-dm-amber focus:outline-none"
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { ContentInputField }
