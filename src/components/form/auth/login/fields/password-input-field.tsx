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
interface PasswordInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const PasswordInputField: FunctionComponent<PasswordInputFieldProps> = ({
  className,
  ...props
}) => {
  const { form } = useLoginFormContext()
  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn('text-black')}>비밀번호</FormLabel>
          <FormControl>
            <Input
              {...field}
              className={cn('w-full')}
              placeholder="비밀번호"
              type="password"
            />
          </FormControl>
          <div className="h-10">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}

export { PasswordInputField }
