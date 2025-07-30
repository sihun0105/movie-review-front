'use client'

import { Form } from '@/components/ui/form'
import {
  FunctionComponent,
  HTMLAttributes,
  useState,
  useMemo,
  useCallback,
} from 'react'
import { Button } from '@/components/ui/button'
import { IdInputField } from './fields/id-input-field'
import { PasswordInputField } from './fields/password-input-field'
import { useRegisterFormContext } from './hook/register-form-context'
import { NicknameInputField } from './fields/nickname-input-field'
import { useRegister } from './hook/use-register'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TermsAgreement } from './fields/terms-agreement'
import { useAppToast } from '@/hooks/use-app-toast'

interface MultiStepRegisterFormProps extends HTMLAttributes<HTMLDivElement> {}

const MultiStepRegisterForm: FunctionComponent<MultiStepRegisterFormProps> = ({
  className: _className,
  ..._props
}) => {
  const { showToast } = useAppToast()
  const { form, onSubmit, emailValidationState, nicknameValidationState } =
    useRegisterFormContext()
  const { register: _register, isRegisting } = useRegister()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleNext = async () => {
    let isValid = false
    let hasValidationError = false

    switch (currentStep) {
      case 1: {
        isValid = await form.trigger('termsAgreed')
        // 약관 동의 확인
        const termsErrors = form.formState.errors.termsAgreed
        if (termsErrors || !form.getValues('termsAgreed')) {
          hasValidationError = true
        }
        break
      }
      case 2: {
        isValid = await form.trigger('userId')
        // 이메일 검증 중이거나 검증 실패한 경우 진행 차단
        const emailErrors = form.formState.errors.userId
        const isEmailValidating = emailValidationState.isValidating
        const isEmailValid = emailValidationState.isValid

        if (
          emailErrors ||
          !form.getValues('userId') ||
          isEmailValidating ||
          !isEmailValid
        ) {
          hasValidationError = true
        }
        break
      }
      case 3: {
        isValid = await form.trigger('password')
        // 비밀번호 검증 실패한 경우 진행 차단
        const passwordErrors = form.formState.errors.password
        if (passwordErrors || !form.getValues('password')) {
          hasValidationError = true
        }
        break
      }
      case 4: {
        isValid = await form.trigger('nickname')
        // 닉네임 검증 중이거나 검증 실패한 경우 진행 차단
        const nicknameErrors = form.formState.errors.nickname
        const isNicknameValidating = nicknameValidationState.isValidating
        const isNicknameValid = nicknameValidationState.isValid

        if (
          nicknameErrors ||
          !form.getValues('nickname') ||
          isNicknameValidating ||
          !isNicknameValid
        ) {
          hasValidationError = true
        }
        break
      }
    }

    if (isValid && !hasValidationError && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitClick = async () => {
    // 먼저 수동으로 validation 실행
    const isValid = await form.trigger()

    if (isValid) {
      const data = form.getValues()
      await onSubmit(
        data,
        () => {
          showToast(
            '회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.',
            3000,
          )
          form.reset()
          setTimeout(() => {
            router.push('/login')
          }, 1500)
        },
        (error: string) => {
          showToast(error, 3000)
        },
      )
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return '약관에 동의해주세요'
      case 2:
        return '이메일을 입력해주세요'
      case 3:
        return '비밀번호를 입력해주세요'
      case 4:
        return '닉네임을 입력해주세요'
      default:
        return ''
    }
  }

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return '서비스 이용을 위해 약관에 동의해주세요.'
      case 2:
        return '로그인할 때 사용할 이메일 주소를 입력해주세요.'
      case 3:
        return '안전한 비밀번호를 설정해주세요.'
      case 4:
        return '다른 사용자들에게 보여질 닉네임을 입력해주세요.'
      default:
        return ''
    }
  }

  // form 값들을 실시간으로 감지
  const watchedValues = form.watch()
  const formErrors = form.formState.errors

  const isCurrentStepValid = useMemo(() => {
    switch (currentStep) {
      case 1: {
        const termsAgreed = watchedValues.termsAgreed
        const hasError = formErrors.termsAgreed
        return termsAgreed && !hasError
      }
      case 2: {
        const emailValue = watchedValues.userId
        const hasError = formErrors.userId

        // 이메일이 있고, 에러가 없고, 검증이 완료되었고, 유효한 상태여야 함
        const isValidEmail =
          emailValue &&
          emailValue.includes('@') &&
          !hasError &&
          !emailValidationState.isValidating &&
          emailValidationState.isValid

        return isValidEmail
      }
      case 3: {
        const passwordValue = watchedValues.password
        const hasError = formErrors.password

        // 비밀번호가 있고 에러가 없어야 함
        const isValidPassword =
          passwordValue && passwordValue.length >= 8 && !hasError

        return isValidPassword
      }
      case 4: {
        const nicknameValue = watchedValues.nickname
        const hasError = formErrors.nickname

        // 닉네임이 있고, 에러가 없고, 검증이 완료되었고, 유효한 상태여야 함
        const isValidNickname =
          nicknameValue &&
          nicknameValue.length >= 2 &&
          !hasError &&
          !nicknameValidationState.isValidating &&
          nicknameValidationState.isValid

        return isValidNickname
      }
      default:
        return false
    }
  }, [
    currentStep,
    watchedValues,
    formErrors,
    emailValidationState.isValidating,
    emailValidationState.isValid,
    nicknameValidationState.isValidating,
    nicknameValidationState.isValid,
  ])

  // 약관 동의 변경 핸들러를 메모이제이션
  const handleAgreementChange = useCallback(
    (isAgreed: boolean) => {
      const currentValue = form.getValues('termsAgreed')
      if (currentValue !== isAgreed) {
        form.setValue('termsAgreed', isAgreed)
        if (isAgreed) {
          form.clearErrors('termsAgreed')
        }
      }
    },
    [form],
  )

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-white/80 p-4 backdrop-blur-sm">
        <button
          onClick={currentStep > 1 ? handleBack : () => router.back()}
          className="rounded-full p-2 transition-colors hover:bg-gray-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="text-sm font-medium text-gray-500">
          {currentStep} / {totalSteps}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/80 px-4 py-2 backdrop-blur-sm">
        <div className="h-1 w-full rounded-full bg-gray-200">
          <motion.div
            className="h-1 rounded-full bg-blue-500"
            initial={{ width: '25%' }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col justify-center px-6 py-8">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {getStepTitle()}
            </h1>
            <p className="leading-relaxed text-gray-600">{getStepSubtitle()}</p>
          </div>

          <Form {...form}>
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TermsAgreement
                      onAgreementChange={handleAgreementChange}
                      isValid={watchedValues.termsAgreed || false}
                    />
                  </motion.div>
                )}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IdInputField />
                  </motion.div>
                )}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PasswordInputField />
                  </motion.div>
                )}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <NicknameInputField />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Form>
        </motion.div>
      </div>

      {/* Bottom Button */}
      <div className="border-t border-gray-100 bg-white p-6">
        {currentStep < totalSteps ? (
          <Button
            onClick={handleNext}
            disabled={!isCurrentStepValid}
            className="h-14 w-full rounded-xl bg-blue-500 text-lg font-semibold shadow-lg transition-all duration-200 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400"
          >
            다음
          </Button>
        ) : (
          <Button
            onClick={handleSubmitClick}
            disabled={!isCurrentStepValid || isRegisting}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-blue-500 text-lg font-semibold shadow-lg transition-all duration-200 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400"
          >
            {isRegisting ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                회원가입 중...
              </>
            ) : (
              <>
                <Check className="h-5 w-5" />
                회원가입 완료
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

export { MultiStepRegisterForm }
