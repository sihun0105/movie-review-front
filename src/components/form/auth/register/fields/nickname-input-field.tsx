'use client'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useDebounce } from '@/hooks/use-debounce'
import { validateNickname } from '@/lib/utils/validation-api'
import { FunctionComponent, useEffect, useState } from 'react'
import { useRegisterFormContext } from '../hook/register-form-context'

const inputCls = 'w-full border border-dm-line-2 bg-dm-surface px-3.5 py-3 text-[14px] text-dm-text placeholder:text-dm-text-faint focus:border-dm-amber focus:outline-none'
const labelCls = 'mb-2 block font-dm-mono text-[10px] uppercase tracking-[1px] text-dm-text-muted'

const NicknameInputField: FunctionComponent = () => {
  const { form, setNicknameValidationState } = useRegisterFormContext()
  const [isValidating, setIsValidating] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')
  const nicknameValue = form.watch('nickname')
  const debounced = useDebounce(nicknameValue, 500)

  useEffect(() => {
    const run = async () => {
      setValidationMessage('')
      setNicknameValidationState({ isValidating: false, isValid: false })
      if (!debounced || debounced.length < 2) { setIsValidating(false); form.clearErrors('nickname'); return }
      setIsValidating(true)
      setNicknameValidationState({ isValidating: true, isValid: false })
      try {
        const result = await validateNickname(debounced)
        if (!result.isAvailable) {
          form.setError('nickname', { type: 'manual', message: result.message || '이미 사용 중인 닉네임입니다.' })
          setNicknameValidationState({ isValidating: false, isValid: false })
        } else {
          form.clearErrors('nickname')
          setValidationMessage('사용 가능한 닉네임입니다.')
          setNicknameValidationState({ isValidating: false, isValid: true })
        }
      } catch {
        form.setError('nickname', { type: 'manual', message: '닉네임 검증 중 오류가 발생했습니다.' })
        setNicknameValidationState({ isValidating: false, isValid: false })
      } finally {
        setIsValidating(false)
      }
    }
    run()
  }, [debounced, form, setNicknameValidationState])

  return (
    <FormField
      control={form.control}
      name="nickname"
      render={({ field }) => (
        <FormItem>
          <label className={labelCls}>
            닉네임
          </label>
          <FormControl>
            <div className="relative">
              <input {...field} placeholder="@my_handle" className={inputCls} />
              {isValidating && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-dm-amber border-t-transparent" />
                </div>
              )}
            </div>
          </FormControl>
          <p className="mt-1 font-dm-mono text-[10px] text-dm-text-faint">한글, 영문, 숫자, _ 사용 가능</p>
          <FormMessage className="font-dm-mono text-[11px] text-dm-red" />
          {validationMessage && !form.formState.errors.nickname && (
            <p className="font-dm-mono text-[11px] text-green-400">{validationMessage}</p>
          )}
        </FormItem>
      )}
    />
  )
}

export { NicknameInputField }
