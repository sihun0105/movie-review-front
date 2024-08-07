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
import { useRegisterFormContext } from '../hook/register-form-context'
interface NicknameInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const NicknameInputField: FunctionComponent<NicknameInputFieldProps> = ({
  className,
  ...props
}) => {
  const { form } = useRegisterFormContext()
  return (
    <FormField
      control={form.control}
      name="nicknmae"
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn('text-black')}>닉네임</FormLabel>
          <FormControl>
            <Input {...field} className={cn('w-full')} placeholder="비밀번호" />
          </FormControl>
          <div className="h-10">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}

export { NicknameInputField }
