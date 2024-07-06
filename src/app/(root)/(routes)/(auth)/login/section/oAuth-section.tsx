'use client'

import AuthButton from '@/app/(root)/(routes)/(auth)/login/components/oAuthButton'
import { AppPath } from '@/config/app-path'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { FunctionComponent } from 'react'
interface OAuthSectionProps {}
const OAuthSection: FunctionComponent<OAuthSectionProps> = ({}) => {
  const searchParams: any = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? AppPath.home()
  const handleAuthSignIn = (provider: 'kakao' | 'naver' | 'google') => {
    signIn(provider, {
      callbackUrl,
    })
  }

  return (
    <div className="flex w-full flex-col">
      <AuthButton
        className="disabled:bg-gray-300 disabled:text-gray-400 disabled:opacity-50"
        onClick={() => handleAuthSignIn('google')}
        provider="google"
      >
        구글 로그인
      </AuthButton>
    </div>
  )
}

export default OAuthSection
