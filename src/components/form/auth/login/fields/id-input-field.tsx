import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FunctionComponent, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { useLoginFormContext } from '../hook/login-form-context'
interface IdInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const IdInputField: FunctionComponent<IdInputFieldProps> = ({
  className,
  ...props
}) => {
  const { form } = useLoginFormContext()
  return (
    <FormField
      control={form.control}
      name="userId"
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn('text-black')}>아이디</FormLabel>
          <FormControl>
            <Input {...field} className={cn('w-full')} placeholder="아이디" />
          </FormControl>
          <div className="h-10">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}

export { IdInputField }
