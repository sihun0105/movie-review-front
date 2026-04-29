'use client'

import AuthButton from '@/app/(root)/(routes)/(auth)/login/components/oAuthButton'
import { DmLoginForm, DmLoginMarquee } from '@/components/dm'
import { AppPath } from '@/config/app-path'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FunctionComponent } from 'react'

const Page: FunctionComponent = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') ?? AppPath.home()

  return (
    <main className="flex min-h-page flex-col bg-dm-bg text-dm-text">
      <DmLoginMarquee />

      <div className="flex-1 px-6 py-6">
        <DmLoginForm />

        <div className="my-5 flex items-center gap-2">
          <span
            aria-hidden
            className="h-px flex-1 border-t border-dashed border-dm-line-2"
          />
          <span className="font-dm-mono text-[10px] text-dm-text-faint">
            OR
          </span>
          <span
            aria-hidden
            className="h-px flex-1 border-t border-dashed border-dm-line-2"
          />
        </div>

        <AuthButton
          provider="google"
          onClick={() => signIn('google', { callbackUrl })}
          className="flex w-full items-center justify-center gap-2 border border-dm-line-2 bg-transparent px-3 py-3 text-[13px] text-dm-text hover:border-dm-amber"
        >
          <span className="font-bold">G</span> Google로 계속하기
        </AuthButton>

        <div className="mt-5 text-center text-[12px] text-dm-text-muted">
          아직 계정이 없으신가요?{' '}
          <Link
            href={AppPath.register()}
            className="text-dm-text underline underline-offset-2 hover:text-dm-amber"
          >
            회원가입
          </Link>
        </div>

        <div className="mt-2 text-center font-dm-mono text-[10px] tracking-[0.5px] text-dm-amber">
          ※ 매칭 이용을 위해 성별 정보가 필요해요
        </div>
      </div>
    </main>
  )
}

export default Page
