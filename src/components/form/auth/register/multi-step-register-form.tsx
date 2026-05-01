'use client'

import { Form } from '@/components/ui/form'
import { useAppToast } from '@/hooks/use-app-toast'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useMemo, useState } from 'react'
import { useRegister } from './hook/use-register'
import { useRegisterFormContext } from './hook/register-form-context'
import { IdInputField } from './fields/id-input-field'
import { NicknameInputField } from './fields/nickname-input-field'
import { PasswordInputField } from './fields/password-input-field'
import { ProfileStep } from './fields/profile-step'

const TOTAL = 4

const stepTitle: Record<number, string> = {
  1: '이메일을 알려주세요',
  2: '비밀번호를\n설정해주세요',
  3: '닉네임을\n정해주세요',
  4: '프로필을 만들어요',
}

const StepDots = ({ step }: { step: number }) => (
  <div className="flex items-center gap-1.5">
    {[1, 2, 3, 4].map((n) => (
      <div
        key={n}
        className="h-1 transition-all duration-200"
        style={{
          width: n === step ? 18 : 6,
          background: n <= step ? 'var(--dm-red)' : 'var(--dm-line-2)',
        }}
      />
    ))}
    <span className="ml-1 font-dm-mono text-[9px] tracking-[1px] text-dm-text-faint">
      STEP {step}/{TOTAL}
    </span>
  </div>
)

const MultiStepRegisterForm: FunctionComponent = () => {
  const { showToast } = useAppToast()
  const { form, onSubmit, emailValidationState, nicknameValidationState } =
    useRegisterFormContext()
  const { isRegisting } = useRegister()
  const router = useRouter()
  const [step, setStep] = useState(1)

  const watched = form.watch()

  const isStepValid = useMemo(() => {
    switch (step) {
      case 1:
        return !!(
          watched.userId?.includes('@') &&
          !form.formState.errors.userId &&
          !emailValidationState.isValidating &&
          emailValidationState.isValid
        )
      case 2:
        return !!(
          watched.password &&
          watched.password.length >= 8 &&
          /[a-zA-Z]/.test(watched.password) &&
          /\d/.test(watched.password) &&
          /[@$!%*?&]/.test(watched.password) &&
          !form.formState.errors.password
        )
      case 3:
        return !!(
          watched.nickname &&
          watched.nickname.length >= 2 &&
          !form.formState.errors.nickname &&
          !nicknameValidationState.isValidating &&
          nicknameValidationState.isValid
        )
      case 4:
        return !!(watched.gender && watched.termsAgreed)
      default:
        return false
    }
  }, [step, watched, form.formState.errors, emailValidationState, nicknameValidationState])

  const handleNext = () => {
    if (step < TOTAL) { setStep(step + 1); return }
    handleSubmit()
  }

  const handleSubmit = async () => {
    const isValid = await form.trigger()
    if (!isValid) return
    const data = form.getValues()
    await onSubmit(
      data,
      () => {
        showToast('회원가입이 완료되었습니다!', 3000)
        form.reset()
        setTimeout(() => router.push('/login'), 1200)
      },
      (err: string) => showToast(err, 3000),
    )
  }

  return (
    <div className="flex min-h-page flex-col bg-dm-bg text-dm-text">
      <div className="flex items-center border-b border-dm-line px-4 py-3.5">
        <button
          onClick={() => (step > 1 ? setStep(step - 1) : router.back())}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <svg width="8" height="14" viewBox="0 0 8 14">
            <path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="ml-3.5 flex-1">
          <StepDots step={step} />
        </div>
      </div>

      <div className="flex-1 px-6 pb-[120px] pt-6">
        <div className="font-dm-mono text-[10px] tracking-[2px] text-dm-amber">SIGN UP</div>
        <div className="mt-1.5 whitespace-pre-line font-dm-display text-[26px] italic leading-tight text-dm-text">
          {stepTitle[step]}
        </div>

        <Form {...form}>
          <div className="mt-7">
            {step === 1 && <IdInputField />}
            {step === 2 && <PasswordInputField />}
            {step === 3 && <NicknameInputField />}
            {step === 4 && <ProfileStep />}
          </div>
        </Form>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-20 border-t border-dm-line px-4 py-4"
        style={{
          background: 'rgba(10,10,12,0.95)',
          backdropFilter: 'blur(10px)',
          maxWidth: 'var(--app-max-width)',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <button
          onClick={handleNext}
          disabled={!isStepValid || isRegisting}
          className="w-full py-3.5 text-[14px] font-bold text-white transition-opacity"
          style={{
            background: 'var(--dm-red)',
            opacity: isStepValid && !isRegisting ? 1 : 0.4,
          }}
        >
          {step < TOTAL ? '다음 →' : isRegisting ? '가입 중...' : '🎟  drunkenmovie 시작하기'}
        </button>
      </div>
    </div>
  )
}

export { MultiStepRegisterForm }
