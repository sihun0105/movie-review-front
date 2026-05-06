import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { FunctionComponent } from 'react'
import { useMatchPostFormContext } from '../hooks/match-post-form-context'

const cls = 'w-full border border-border bg-secondary px-3.5 py-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none'
const labelCls = 'mb-1.5 block font-mono text-[10px] uppercase tracking-[1px] text-muted-foreground'

const MovieTitleInputField: FunctionComponent = () => {
  const { form } = useMatchPostFormContext()
  return (
    <FormField
      control={form.control}
      name="movieTitle"
      render={({ field }) => (
        <FormItem>
          <label className={labelCls}>영화 제목</label>
          <FormControl>
            <input {...field} className={cls} placeholder="영화 제목" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { MovieTitleInputField }
