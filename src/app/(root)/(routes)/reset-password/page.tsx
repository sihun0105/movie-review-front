'use client'

import { AppPath } from '@/config/app-path'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams?.get('token') ?? ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!token) {
    return (
      <main className="flex min-h-page flex-col items-center justify-center px-6">
        <p className="text-[14px] text-muted-foreground">유효하지 않은 링크입니다.</p>
        <Link href={AppPath.login()} className="mt-4 text-[13px] font-medium text-foreground hover:underline">
          로그인으로 돌아가기
        </Link>
      </main>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    if (password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      })
      const data = await res.json()
      if (data.success) {
        router.push(`${AppPath.login()}?reset=1`)
      } else {
        setError(data.message || '오류가 발생했습니다.')
      }
    } catch {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-page flex-col px-6 py-10">
      <div className="mb-8 text-[22px] font-bold tracking-tight text-foreground">
        drunken<span className="text-primary">movie</span>
      </div>

      <h2 className="mb-1.5 text-[22px] font-semibold tracking-tight text-foreground">새 비밀번호 설정</h2>
      <p className="mb-6 text-[13px] text-muted-foreground">8자 이상의 새 비밀번호를 입력하세요</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-foreground">
            새 비밀번호
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="confirm" className="mb-1.5 block text-[13px] font-medium text-foreground">
            비밀번호 확인
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
          />
        </div>

        {error && <p className="text-[12px] text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password || !confirm}
          className="h-11 w-full rounded-md bg-primary text-[14px] font-medium text-primary-foreground disabled:opacity-50"
        >
          {loading ? '변경 중...' : '비밀번호 변경'}
        </button>
      </form>
    </main>
  )
}
