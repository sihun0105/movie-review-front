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
import { validateNickname } from '@/lib/utils/validation-api'
import { useDebounce } from '@/hooks/use-debounce'
interface NicknameInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const NicknameInputField: FunctionComponent<NicknameInputFieldProps> = ({
  className,
  ...props
}) => {
  const { form } = useRegisterFormContext()
  const [isValidating, setIsValidating] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')

  const nicknameValue = form.watch('nicknmae')
  const debouncedNickname = useDebounce(nicknameValue, 500)

  useEffect(() => {
    const validateNicknameAsync = async () => {
      if (!debouncedNickname || debouncedNickname.length < 2) {
        setValidationMessage('')
        setIsValidating(false)
        return
      }

      setIsValidating(true)
      try {
        const result = await validateNickname(debouncedNickname)

        if (!result.isAvailable) {
          form.setError('nicknmae', {
            type: 'manual',
            message: result.message || '이미 사용 중인 닉네임입니다.',
          })
          setValidationMessage('이미 사용 중인 닉네임입니다.')
        } else {
          form.clearErrors('nicknmae')
          setValidationMessage('사용 가능한 닉네임입니다.')
        }
      } catch (error) {
        console.error('Nickname validation error:', error)
        setValidationMessage('닉네임 검증 중 오류가 발생했습니다.')
      } finally {
        setIsValidating(false)
      }
    }

    validateNicknameAsync()
  }, [debouncedNickname, form])

  return (
    <FormField
      control={form.control}
      name="nicknmae"
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn('text-black')}>닉네임</FormLabel>
          <FormControl>
            <div className="relative">
              <Input {...field} className={cn('w-full')} placeholder="닉네임" />
              {isValidating && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
          </FormControl>
          <div className="h-10">
            <FormMessage />
            {validationMessage && !form.formState.errors.nicknmae && (
              <p className="mt-1 text-sm text-green-600">{validationMessage}</p>
            )}
          </div>
        </FormItem>
      )}
    />
  )
}

export { NicknameInputField }
