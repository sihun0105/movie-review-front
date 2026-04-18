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
  const { form, setNicknameValidationState } = useRegisterFormContext()
  const [isValidating, setIsValidating] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')

  const nicknameValue = form.watch('nickname')
  const debouncedNickname = useDebounce(nicknameValue, 500)

  useEffect(() => {
    const validateNicknameAsync = async () => {
      setNicknameValidationState({ isValidating: false, isValid: false })

      if (!debouncedNickname || debouncedNickname.length < 2) {
        setValidationMessage('')
        setIsValidating(false)
        form.clearErrors('nickname')
        return
      }

      setIsValidating(true)
      setNicknameValidationState({ isValidating: true, isValid: false })

      try {
        const result = await validateNickname(debouncedNickname)

        if (!result.isAvailable) {
          form.setError('nickname', {
            type: 'manual',
            message: result.message || '이미 사용 중인 닉네임입니다.',
          })
          setValidationMessage('이미 사용 중인 닉네임입니다.')
          setNicknameValidationState({ isValidating: false, isValid: false })
        } else {
          form.clearErrors('nickname')
          setValidationMessage('사용 가능한 닉네임입니다.')
          setNicknameValidationState({ isValidating: false, isValid: true })
        }
      } catch (error) {
        console.error('Nickname validation error:', error)
        form.setError('nickname', {
          type: 'manual',
          message: '닉네임 검증 중 오류가 발생했습니다.',
        })
        setValidationMessage('닉네임 검증 중 오류가 발생했습니다.')
        setNicknameValidationState({ isValidating: false, isValid: false })
      } finally {
        setIsValidating(false)
      }
    }

    validateNicknameAsync()
  }, [debouncedNickname, form, setNicknameValidationState])

  return (
    <FormField
      control={form.control}
      name="nickname"
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
            {validationMessage && !form.formState.errors.nickname && (
              <p className="mt-1 text-sm text-green-600">{validationMessage}</p>
            )}
          </div>
        </FormItem>
      )}
    />
  )
}

export { NicknameInputField }
