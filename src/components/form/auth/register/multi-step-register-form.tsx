'use client'

import { Form } from '@/components/ui/form'
import { FunctionComponent, HTMLAttributes, useState } from 'react'
import { Button } from '@/components/ui/button'
import { IdInputField } from './fields/id-input-field'
import { PasswordInputField } from './fields/password-input-field'
import { useRegisterFormContext } from './hook/register-form-context'
import { NicknameInputField } from './fields/nickname-input-field'
import { useRegister } from './hook/use-register'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppToast } from '@/hooks/use-app-toast'

interface MultiStepRegisterFormProps extends HTMLAttributes<HTMLDivElement> {}

const MultiStepRegisterForm: FunctionComponent<MultiStepRegisterFormProps> = ({
  className: _className,
  ...props
}) => {
  const { showToast } = useAppToast()
  const { form, onSubmit } = useRegisterFormContext()
  const { register, isRegisting } = useRegister()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const handleNext = async () => {
    let isValid = false

    switch (currentStep) {
      case 1:
        isValid = await form.trigger('userId')
        break
      case 2:
        isValid = await form.trigger('password')
        break
      case 3:
        isValid = await form.trigger('nicknmae')
        break
    }

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = form.handleSubmit(async (data) => {
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
  })

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return '이메일을 입력해주세요'
      case 2:
        return '비밀번호를 입력해주세요'
      case 3:
        return '닉네임을 입력해주세요'
      default:
        return ''
    }
  }

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return '로그인할 때 사용할 이메일 주소를 입력해주세요.'
      case 2:
        return '안전한 비밀번호를 설정해주세요.'
      case 3:
        return '다른 사용자들에게 보여질 닉네임을 입력해주세요.'
      default:
        return ''
    }
  }

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return !form.formState.errors.userId && form.getValues('userId')
      case 2:
        return !form.formState.errors.password && form.getValues('password')
      case 3:
        return !form.formState.errors.nicknmae && form.getValues('nicknmae')
      default:
        return false
    }
  }

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
            initial={{ width: '33%' }}
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
                    <IdInputField />
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
                    <PasswordInputField />
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
            disabled={!isCurrentStepValid()}
            className="h-14 w-full rounded-xl bg-blue-500 text-lg font-semibold shadow-lg transition-all duration-200 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400"
          >
            다음
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!form.formState.isValid || isRegisting}
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
