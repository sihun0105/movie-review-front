import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { FunctionComponent } from 'react'
import { useMatchPostFormContext } from '../hooks/match-post-form-context'

const cls = 'w-full border border-dm-line-2 bg-dm-surface px-3.5 py-3 text-[14px] text-dm-text focus:border-dm-amber focus:outline-none'
const labelCls = 'mb-1.5 block font-dm-mono text-[10px] uppercase tracking-[1px] text-dm-text-muted'

const MaxParticipantsInputField: FunctionComponent = () => {
  const { form } = useMatchPostFormContext()
  return (
    <FormField
      control={form.control}
      name="maxParticipants"
      render={({ field }) => (
        <FormItem>
          <label className={labelCls}>최대 인원</label>
          <FormControl>
            <input
              {...field}
              type="number"
              min="1"
              max="10"
              className={cls}
              onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { MaxParticipantsInputField }
