'use client'

import { Form } from '@/components/ui/form'
import { useAppToast } from '@/hooks/use-app-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useMemo, useState } from 'react'
import { useRegister } from './hook/use-register'
import { useRegisterFormContext } from './hook/register-form-context'
import { IdInputField } from './fields/id-input-field'
import { NicknameInputField } from './fields/nickname-input-field'
import { PasswordInputField } from './fields/password-input-field'
import { ProfileStep } from './fields/profile-step'
import { VerificationStep } from './verification-step'

const TOTAL = 5

const stepTitle: Record<number, string> = {
  1: '이메일을 알려주세요',
  2: '이메일을\n인증해주세요',
  3: '비밀번호를\n설정해주세요',
  4: '닉네임을\n정해주세요',
  5: '프로필을 만들어요',
}

const StepDots = ({ step }: { step: number }) => (
  <div className="flex items-center gap-1.5">
    {Array.from({ length: TOTAL }, (_, i) => i + 1).map((n) => (
      <div
        key={n}
        className="h-1 rounded-full transition-all duration-200"
        style={{
          width: n === step ? 18 : 6,
          background: n <= step ? 'hsl(var(--primary))' : 'hsl(var(--border))',
        }}
      />
    ))}
    <span className="ml-1 font-mono text-[10px] text-muted-foreground">
      {step}/{TOTAL}
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
  const [emailVerified, setEmailVerified] = useState(false)

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
        return emailVerified
      case 3:
        return !!(
          watched.password &&
          watched.password.length >= 8 &&
          /[a-zA-Z]/.test(watched.password) &&
          /\d/.test(watched.password) &&
          /[@$!%*?&]/.test(watched.password) &&
          !form.formState.errors.password
        )
      case 4:
        return !!(
          watched.nickname &&
          watched.nickname.length >= 2 &&
          !form.formState.errors.nickname &&
          !nicknameValidationState.isValidating &&
          nicknameValidationState.isValid
        )
      case 5:
        return !!(watched.gender && watched.termsAgreed)
      default:
        return false
    }
  }, [step, watched, form.formState.errors, emailValidationState, nicknameValidationState, emailVerified])

  const handleNext = async () => {
    if (step === 1) {
      // 이메일 입력 완료 → 인증 코드 발송
      await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: watched.userId }),
      })
      setStep(2)
      return
    }
    if (step < TOTAL) { setStep(step + 1); return }
    handleSubmit()
  }

  const handleSubmit = async () => {
    const isValid = await form.trigger()
    if (!isValid) return
    const data = form.getValues()
    await onSubmit(
      data,
      async () => {
        showToast('회원가입이 완료되었습니다!', 3000)
        const result = await signIn('credentials', {
          userId: data.userId,
          password: data.password,
          redirect: false,
          callbackUrl: '/',
        })

        if (result?.error) {
          router.push('/login')
          return
        }

        form.reset()
        window.location.href = result?.url || '/'
      },
      (err: string) => showToast(err, 3000),
    )
  }

  return (
    <div className="flex min-h-page flex-col">
      <div className="flex items-center border-b border-border px-4 py-3.5">
        <button
          onClick={() => (step > 1 ? setStep(step - 1) : router.back())}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border"
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
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">SIGN UP</div>
        <div className="mt-1.5 whitespace-pre-line text-[24px] font-bold leading-tight tracking-tight text-foreground">
          {stepTitle[step]}
        </div>

        <div className="mt-7">
          {step === 1 && (
            <Form {...form}>
              <IdInputField />
            </Form>
          )}
          {step === 2 && (
            <VerificationStep
              email={watched.userId || ''}
              onVerified={() => { setEmailVerified(true); setStep(3) }}
            />
          )}
          {step === 3 && (
            <Form {...form}>
              <PasswordInputField />
            </Form>
          )}
          {step === 4 && (
            <Form {...form}>
              <NicknameInputField />
            </Form>
          )}
          {step === 5 && (
            <Form {...form}>
              <ProfileStep />
            </Form>
          )}
        </div>
      </div>

      {step !== 2 && (
        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-border px-4 py-4 backdrop-blur-md"
          style={{ background: 'hsl(var(--background)/0.95)', maxWidth: '460px', margin: '0 auto' }}>
          <button
            onClick={handleNext}
            disabled={!isStepValid || isRegisting}
            className="h-11 w-full rounded-md bg-primary text-[14px] font-medium text-primary-foreground disabled:opacity-50"
          >
            {step < TOTAL ? '다음' : isRegisting ? '가입 중...' : '볼래 시작하기'}
          </button>
        </div>
      )}
    </div>
  )
}

export { MultiStepRegisterForm }
