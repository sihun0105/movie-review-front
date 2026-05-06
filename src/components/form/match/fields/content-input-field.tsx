import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { FunctionComponent } from 'react'
import { useMatchPostFormContext } from '../hooks/match-post-form-context'

const cls = 'w-full resize-none border border-border bg-secondary px-3.5 py-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none'
const labelCls = 'mb-1.5 block font-mono text-[10px] uppercase tracking-[1px] text-muted-foreground'

const ContentInputField: FunctionComponent = () => {
  const { form } = useMatchPostFormContext()
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <label className={labelCls}>내용</label>
          <FormControl>
            <textarea {...field} className={cls} rows={4} placeholder="모집 내용을 입력하세요" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { ContentInputField }
