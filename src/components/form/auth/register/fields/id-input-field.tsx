'use client'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useDebounce } from '@/hooks/use-debounce'
import { validateEmail } from '@/lib/utils/validation-api'
import { FunctionComponent, useEffect, useState } from 'react'
import { useRegisterFormContext } from '../hook/register-form-context'

const inputCls = 'w-full border border-dm-line-2 bg-dm-surface px-3.5 py-3 text-[14px] text-dm-text placeholder:text-dm-text-faint focus:border-dm-amber focus:outline-none'
const labelCls = 'mb-2 block font-dm-mono text-[10px] uppercase tracking-[1px] text-dm-text-muted'

const IdInputField: FunctionComponent = () => {
  const { form, setEmailValidationState } = useRegisterFormContext()
  const [isValidating, setIsValidating] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')
  const emailValue = form.watch('userId')
  const debouncedEmail = useDebounce(emailValue, 500)

  useEffect(() => {
    const run = async () => {
      setValidationMessage('')
      setEmailValidationState({ isValidating: false, isValid: false })
      if (!debouncedEmail?.includes('@')) {
        setIsValidating(false)
        form.clearErrors('userId')
        return
      }
      setIsValidating(true)
      setEmailValidationState({ isValidating: true, isValid: false })
      try {
        const result = await validateEmail(debouncedEmail)
        if (!result.isAvailable) {
          form.setError('userId', { type: 'manual', message: result.message || '이미 사용 중인 이메일입니다.' })
          setEmailValidationState({ isValidating: false, isValid: false })
        } else {
          form.clearErrors('userId')
          setValidationMessage('사용 가능한 이메일입니다.')
          setEmailValidationState({ isValidating: false, isValid: true })
        }
      } catch {
        form.setError('userId', { type: 'manual', message: '이메일 검증 중 오류가 발생했습니다.' })
        setEmailValidationState({ isValidating: false, isValid: false })
      } finally {
        setIsValidating(false)
      }
    }
    run()
  }, [debouncedEmail, form, setEmailValidationState])

  return (
    <FormField
      control={form.control}
      name="userId"
      render={({ field }) => (
        <FormItem>
          <label className={labelCls}>이메일</label>
          <FormControl>
            <div className="relative">
              <input {...field} type="email" placeholder="you@email.com" className={inputCls} />
              {isValidating && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-dm-amber border-t-transparent" />
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="font-dm-mono text-[11px] text-dm-red" />
          {validationMessage && !form.formState.errors.userId && (
            <p className="font-dm-mono text-[11px] text-green-400">{validationMessage}</p>
          )}
        </FormItem>
      )}
    />
  )
}

export { IdInputField }
