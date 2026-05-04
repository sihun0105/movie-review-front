'use client'

import { DmLoginForm } from '@/components/dm'
import { AppPath } from '@/config/app-path'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FunctionComponent } from 'react'

const Page: FunctionComponent = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') ?? AppPath.home()

  return (
    <main className="flex min-h-page flex-col px-6 py-10">
      <div className="mb-8">
        <div className="text-[22px] font-bold tracking-tight text-foreground">
          drunken<span className="text-primary">movie</span>
        </div>
        <p className="mt-1 text-[13px] text-muted-foreground">오늘 밤, 같이 볼 사람을 찾아보세요</p>
      </div>

      <h2 className="mb-1.5 text-[22px] font-semibold tracking-tight text-foreground">로그인</h2>
      <p className="mb-6 text-[13px] text-muted-foreground">이메일과 비밀번호를 입력하세요</p>

      <DmLoginForm />

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">or</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        onClick={() => signIn('google', { callbackUrl })}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border text-[14px] font-medium text-foreground hover:bg-accent"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google로 계속하기
      </button>

      <div className="mt-auto pt-8 text-center">
        <span className="text-[13px] text-muted-foreground">아직 계정이 없으신가요? </span>
        <Link href={AppPath.register()} className="text-[13px] font-medium text-foreground hover:underline">
          회원가입
        </Link>
      </div>
    </main>
  )
}

export default Page
