import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FunctionComponent, HTMLAttributes } from 'react'
import { useMatchPostFormContext } from '../hooks/match-post-form-context'

interface ShowTimeInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const ShowTimeInputField: FunctionComponent<ShowTimeInputFieldProps> = () => {
  const { form } = useMatchPostFormContext()

  return (
    <FormField
      control={form.control}
      name="showTime"
      render={({ field }) => (
        <FormItem>
          <FormLabel>상영 시간</FormLabel>
          <FormControl>
            <Input {...field} type="datetime-local" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { ShowTimeInputField }
