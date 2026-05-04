'use client'

import { AppPath } from '@/config/app-path'
import Link from 'next/link'
import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.message || '오류가 발생했습니다.')
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <main className="flex min-h-page flex-col px-6 py-10">
        <div className="mb-8 text-[22px] font-bold tracking-tight text-foreground">
          drunken<span className="text-primary">movie</span>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-2 text-[15px] font-semibold text-foreground">이메일을 확인하세요</div>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">{email}</span>으로 비밀번호 재설정 링크를 보냈습니다.
            스팸 폴더도 확인해보세요.
          </p>
        </div>
        <div className="mt-6 text-center">
          <Link href={AppPath.login()} className="text-[13px] font-medium text-foreground hover:underline">
            ← 로그인으로 돌아가기
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-page flex-col px-6 py-10">
      <div className="mb-8 text-[22px] font-bold tracking-tight text-foreground">
        drunken<span className="text-primary">movie</span>
      </div>

      <h2 className="mb-1.5 text-[22px] font-semibold tracking-tight text-foreground">비밀번호 찾기</h2>
      <p className="mb-6 text-[13px] text-muted-foreground">
        가입하신 이메일을 입력하면 재설정 링크를 보내드립니다
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-foreground">
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
          />
        </div>

        {error && <p className="text-[12px] text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="h-11 w-full rounded-md bg-primary text-[14px] font-medium text-primary-foreground disabled:opacity-50"
        >
          {loading ? '발송 중...' : '재설정 링크 보내기'}
        </button>
      </form>

      <div className="mt-6 rounded-lg border border-border bg-card p-4">
        <p className="text-[12px] font-medium text-foreground mb-1">도움이 필요하신가요?</p>
        <p className="text-[12px] text-muted-foreground leading-relaxed">
          이메일을 받지 못했다면 스팸함을 확인하거나 다른 이메일로 시도해보세요.
        </p>
      </div>

      <div className="mt-auto pt-8 text-center">
        <Link href={AppPath.login()} className="text-[13px] text-muted-foreground hover:text-foreground">
          ← 로그인으로 돌아가기
        </Link>
      </div>
    </main>
  )
}
