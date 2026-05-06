import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { FunctionComponent } from 'react'
import { useMatchPostFormContext } from '../hooks/match-post-form-context'

const cls = 'w-full border border-border bg-secondary px-3.5 py-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none'
const labelCls = 'mb-1.5 block font-mono text-[10px] uppercase tracking-[1px] text-muted-foreground'

const TheaterNameInputField: FunctionComponent = () => {
  const { form } = useMatchPostFormContext()
  return (
    <FormField
      control={form.control}
      name="theaterName"
      render={({ field }) => (
        <FormItem>
          <label className={labelCls}>영화관</label>
          <FormControl>
            <input {...field} className={cls} placeholder="영화관 이름" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { TheaterNameInputField }
