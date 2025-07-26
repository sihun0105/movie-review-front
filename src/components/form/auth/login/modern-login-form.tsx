'use client'

import { Form } from '@/components/ui/form'
import { FunctionComponent, HTMLAttributes, useState } from 'react'
import { Button } from '@/components/ui/button'
import { IdInputField } from './fields/id-input-field'
import { PasswordInputField } from './fields/password-input-field'
import { signIn } from 'next-auth/react'
import { useLoginFormContext } from './hook/login-form-context'
import { Eye, EyeOff, LogIn, Mail, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

interface ModernLoginFormProps extends HTMLAttributes<HTMLDivElement> {}

const ModernLoginForm: FunctionComponent<ModernLoginFormProps> = ({
  className: _className,
  ..._props
}) => {
  const { form, onSubmit } = useLoginFormContext()
  const isFormValid = form.formState.isValid
  const [isLogging, setIsLogging] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLogging(true)
    onSubmit(
      data,
      () => {
        signIn('credentials', {
          ...data,
          callbackUrl: '/',
        })
      },
      () => {
        setIsLogging(false)
      },
    )
  })

  return (
    <div className="flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Logo Section */}
      <div className="flex flex-col justify-center px-6 py-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-3xl font-bold text-gray-900">로그인</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-1">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail className="h-4 w-4" />
                  이메일
                </label>
                <div className="relative">
                  <IdInputField />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Lock className="h-4 w-4" />
                  비밀번호
                </label>
                <div className="relative">
                  <PasswordInputField />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-600"
                >
                  비밀번호를 잊으셨나요?
                </button>
              </div>

              {/* Login Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={!isFormValid || isLogging}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-blue-500 text-lg font-semibold shadow-lg transition-all duration-200 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400"
                >
                  {isLogging ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      로그인 중...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      로그인
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  )
}

export { ModernLoginForm }
