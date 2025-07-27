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
import { validateEmail } from '@/lib/utils/validation-api'
import { useDebounce } from '@/hooks/use-debounce'

interface IdInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const IdInputField: FunctionComponent<IdInputFieldProps> = ({
  className,
  ...props
}) => {
  const { form } = useRegisterFormContext()
  const [isValidating, setIsValidating] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')

  const emailValue = form.watch('userId')
  const debouncedEmail = useDebounce(emailValue, 500)

  useEffect(() => {
    const validateEmailAsync = async () => {
      if (!debouncedEmail || !debouncedEmail.includes('@')) {
        setValidationMessage('')
        setIsValidating(false)
        return
      }

      setIsValidating(true)
      try {
        const result = await validateEmail(debouncedEmail)

        if (!result.isAvailable) {
          form.setError('userId', {
            type: 'manual',
            message: result.message || '이미 사용 중인 이메일입니다.',
          })
          setValidationMessage('이미 사용 중인 이메일입니다.')
        } else {
          form.clearErrors('userId')
          setValidationMessage('사용 가능한 이메일입니다.')
        }
      } catch (error) {
        console.error('Email validation error:', error)
        setValidationMessage('이메일 검증 중 오류가 발생했습니다.')
      } finally {
        setIsValidating(false)
      }
    }

    validateEmailAsync()
  }, [debouncedEmail, form])

  return (
    <FormField
      control={form.control}
      name="userId"
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn('text-black')}>아이디</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                className={cn('w-full')}
                placeholder="이메일 주소"
                type="email"
              />
              {isValidating && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
          </FormControl>
          <div className="h-10">
            <FormMessage />
            {validationMessage && !form.formState.errors.userId && (
              <p className="mt-1 text-sm text-green-600">{validationMessage}</p>
            )}
          </div>
        </FormItem>
      )}
    />
  )
}

export { IdInputField }
