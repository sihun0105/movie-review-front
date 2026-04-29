'use client'

import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const inputCls =
  'w-full border border-dm-line-2 bg-dm-surface px-3.5 py-3 text-[14px] text-dm-text placeholder:text-dm-text-faint focus:border-dm-amber focus:outline-none'
const labelCls =
  'mb-1.5 block font-dm-mono text-[10px] uppercase tracking-[1px] text-dm-text-muted'

export function DmLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') ?? '/'
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId.trim() || !password) return
    setIsSubmitting(true)
    setError(null)
    const res = await signIn('credentials', {
      userId,
      password,
      redirect: false,
      callbackUrl,
    })
    setIsSubmitting(false)
    if (res?.error) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      return
    }
    router.push(callbackUrl)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 font-dm-display text-[22px] italic text-dm-text">
        Sign in.
      </div>

      <label className={labelCls} htmlFor="userId">
        이메일
      </label>
      <input
        id="userId"
        type="text"
        autoComplete="username"
        placeholder="you@email.com"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className={inputCls}
      />

      <label className={`${labelCls} mt-3.5`} htmlFor="password">
        비밀번호
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputCls}
      />

      {error && (
        <div className="mt-2 font-dm-mono text-[11px] text-dm-red">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !userId || !password}
        className="mt-4 w-full bg-dm-red py-3.5 text-[14px] font-bold text-white disabled:bg-dm-surface-2 disabled:text-dm-text-faint"
      >
        {isSubmitting ? '로그인 중...' : '로그인 →'}
      </button>
    </form>
  )
}
