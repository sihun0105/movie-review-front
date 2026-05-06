'use client'

import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

function toRelativePath(url: string): string {
  try {
    const { pathname, search, hash } = new URL(url)
    return pathname + search + hash
  } catch {
    return url.startsWith('/') ? url : '/'
  }
}

export function DmLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const rawCallback = searchParams?.get('callbackUrl') ?? '/'
  const callbackUrl = toRelativePath(rawCallback)
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="userId" className="mb-1.5 block text-[13px] font-medium text-foreground">
          이메일
        </label>
        <input
          id="userId"
          type="text"
          autoComplete="username"
          placeholder="name@example.com"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-foreground">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
        />
      </div>

      {error && (
        <p className="text-[12px] text-destructive">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !userId || !password}
        className="h-11 w-full rounded-md bg-primary text-[14px] font-medium text-primary-foreground disabled:opacity-50"
      >
        {isSubmitting ? '로그인 중...' : '로그인'}
      </button>
    </form>
  )
}
