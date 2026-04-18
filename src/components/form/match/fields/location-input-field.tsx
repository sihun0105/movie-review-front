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

interface LocationInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const LocationInputField: FunctionComponent<LocationInputFieldProps> = () => {
  const { form } = useMatchPostFormContext()

  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>위치</FormLabel>
          <FormControl>
            <Input {...field} placeholder="영화관 위치 (예: 강남구, 홍대 등)" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { LocationInputField }
