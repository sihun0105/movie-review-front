'use client'

import AuthButton from '@/app/(root)/(routes)/(auth)/login/components/oAuthButton'
import { AppPath } from '@/config/app-path'
import { signIn } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ModernOAuthSectionProps {}

const ModernOAuthSection: FunctionComponent<ModernOAuthSectionProps> = ({}) => {
  const searchParams: any = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get('callbackUrl') ?? AppPath.home()

  const handleAuthSignIn = (provider: 'kakao' | 'naver' | 'google') => {
    signIn(provider, {
      callbackUrl,
    })
  }

  return (
    <div className="space-y-6 px-6 pb-8">
      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="px-3 text-sm text-gray-500">또는</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Social Login */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-3"
      >
        <AuthButton
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50"
          onClick={() => handleAuthSignIn('google')}
          provider="google"
        >
          Google로 계속하기
        </AuthButton>
      </motion.div>

      {/* Sign Up Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="pt-4"
      >
        <div className="mb-4 text-center text-sm text-gray-600">
          아직 계정이 없으신가요?
        </div>
        <Button
          onClick={() => router.push(AppPath.register())}
          variant="outline"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-500 font-semibold text-blue-500 transition-all duration-200 hover:bg-blue-50"
        >
          <UserPlus className="h-5 w-5" />
          회원가입하기
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  )
}

export default ModernOAuthSection
