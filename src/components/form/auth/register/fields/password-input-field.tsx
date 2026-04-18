import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FunctionComponent, HTMLAttributes, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { useRegisterFormContext } from '../hook/register-form-context'
import { Check, X } from 'lucide-react'

interface PasswordInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const PasswordInputField: FunctionComponent<PasswordInputFieldProps> = ({
  className,
  ...props
}) => {
  const { form } = useRegisterFormContext()
  const [validationChecks, setValidationChecks] = useState({
    length: false,
    hasLetter: false,
    hasNumber: false,
    hasSpecial: false,
  })

  const passwordValue = form.watch('password')

  useEffect(() => {
    if (!passwordValue) {
      setValidationChecks({
        length: false,
        hasLetter: false,
        hasNumber: false,
        hasSpecial: false,
      })
      return
    }

    setValidationChecks({
      length: passwordValue.length >= 8,
      hasLetter: /[a-zA-Z]/.test(passwordValue),
      hasNumber: /\d/.test(passwordValue),
      hasSpecial: /[@$!%*?&]/.test(passwordValue),
    })
  }, [passwordValue])

  const ValidationCheck = ({
    isValid,
    text,
  }: {
    isValid: boolean
    text: string
  }) => (
    <div
      className={cn(
        'flex items-center gap-2 text-sm',
        isValid ? 'text-green-600' : 'text-gray-400',
      )}
    >
      {isValid ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      <span>{text}</span>
    </div>
  )

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
          <div className="space-y-2">
            <FormMessage />
            {passwordValue && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-700">
                  비밀번호 요구사항:
                </p>
                <ValidationCheck
                  isValid={validationChecks.length}
                  text="최소 8자 이상"
                />
                <ValidationCheck
                  isValid={validationChecks.hasLetter}
                  text="영문 포함"
                />
                <ValidationCheck
                  isValid={validationChecks.hasNumber}
                  text="숫자 포함"
                />
                <ValidationCheck
                  isValid={validationChecks.hasSpecial}
                  text="특수문자 포함 (@$!%*?&)"
                />
              </div>
            )}
          </div>
        </FormItem>
      )}
    />
  )
}

export { PasswordInputField }
