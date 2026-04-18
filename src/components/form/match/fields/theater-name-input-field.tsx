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

interface TheaterNameInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const TheaterNameInputField: FunctionComponent<
  TheaterNameInputFieldProps
> = () => {
  const { form } = useMatchPostFormContext()

  return (
    <FormField
      control={form.control}
      name="theaterName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>영화관</FormLabel>
          <FormControl>
            <Input {...field} placeholder="영화관 이름" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { TheaterNameInputField }
