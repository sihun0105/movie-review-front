import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { FunctionComponent } from 'react'
import { useMatchPostFormContext } from '../hooks/match-post-form-context'

const cls = 'w-full border border-dm-line-2 bg-dm-surface px-3.5 py-3 text-[14px] text-dm-text placeholder:text-dm-text-faint focus:border-dm-amber focus:outline-none'
const labelCls = 'mb-1.5 block font-dm-mono text-[10px] uppercase tracking-[1px] text-dm-text-muted'

const LocationInputField: FunctionComponent = () => {
  const { form } = useMatchPostFormContext()
  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <label className={labelCls}>위치</label>
          <FormControl>
            <input {...field} className={cls} placeholder="영화관 위치 (예: 강남구, 홍대 등)" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { LocationInputField }
