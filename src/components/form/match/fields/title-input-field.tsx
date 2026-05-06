import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { FunctionComponent } from 'react'
import { useMatchPostFormContext } from '../hooks/match-post-form-context'

const inputCls = 'w-full border border-border bg-secondary px-3.5 py-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none'
const labelCls = 'mb-1.5 block font-mono text-[10px] uppercase tracking-[1px] text-muted-foreground'

const TitleInputField: FunctionComponent = () => {
  const { form } = useMatchPostFormContext()
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <label className={labelCls}>제목</label>
          <FormControl>
            <input {...field} className={inputCls} placeholder="모집 글 제목을 입력하세요" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { TitleInputField }
