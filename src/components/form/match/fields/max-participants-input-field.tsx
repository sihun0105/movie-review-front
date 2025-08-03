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

interface MaxParticipantsInputFieldProps
  extends HTMLAttributes<HTMLDivElement> {}

const MaxParticipantsInputField: FunctionComponent<
  MaxParticipantsInputFieldProps
> = () => {
  const { form } = useMatchPostFormContext()

  return (
    <FormField
      control={form.control}
      name="maxParticipants"
      render={({ field }) => (
        <FormItem>
          <FormLabel>최대 인원</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              min="1"
              max="10"
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
