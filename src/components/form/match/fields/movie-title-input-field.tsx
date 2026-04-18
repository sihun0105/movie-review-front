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

interface MovieTitleInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const MovieTitleInputField: FunctionComponent<
  MovieTitleInputFieldProps
> = () => {
  const { form } = useMatchPostFormContext()

  return (
    <FormField
      control={form.control}
      name="movieTitle"
      render={({ field }) => (
        <FormItem>
          <FormLabel>영화 제목</FormLabel>
          <FormControl>
            <Input {...field} placeholder="영화 제목" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { MovieTitleInputField }
