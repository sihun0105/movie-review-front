'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SetupNicknamePage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = nickname.trim()
    if (trimmed.length < 2 || trimmed.length > 10) {
      setError('닉네임은 2~10자 사이여야 합니다.')
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/user/nickname', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: trimmed }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.message || '닉네임 설정에 실패했습니다.')
        return
      }
      await update({ nickname: trimmed })
      router.replace('/')
    } catch {
      setError('오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-page flex-col px-6 py-10">
      <div className="mb-8">
        <div className="text-[22px] font-bold tracking-tight text-foreground">
          drunken<span className="text-primary">movie</span>
        </div>
      </div>

      <h2 className="mb-1.5 text-[22px] font-semibold tracking-tight text-foreground">
        닉네임을 설정해주세요
      </h2>
      <p className="mb-6 text-[13px] text-muted-foreground">
        drunkenmovie에서 사용할 이름이에요. 나중에 계정 설정에서 변경할 수 있어요.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nickname" className="mb-1.5 block text-[13px] font-medium text-foreground">
            닉네임 <span className="text-muted-foreground">(2~10자)</span>
          </label>
          <input
            id="nickname"
            type="text"
            autoComplete="nickname"
            placeholder="영화좋아요"
            value={nickname}
            onChange={(e) => { setNickname(e.target.value); setError(null) }}
            maxLength={10}
            className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
          />
          <div className="mt-1.5 flex items-center justify-between">
            {error
              ? <p className="text-[12px] text-destructive">{error}</p>
              : <span />
            }
            <span className="ml-auto font-mono text-[11px] text-muted-foreground">
              {nickname.length}/10
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || nickname.trim().length < 2}
          className="h-11 w-full rounded-md bg-primary text-[14px] font-medium text-primary-foreground disabled:opacity-50"
        >
          {isLoading ? '설정 중...' : '시작하기'}
        </button>
      </form>

      {session?.user?.email && (
        <p className="mt-6 text-center font-mono text-[11px] text-muted-foreground">
          {session.user.email}로 로그인됨
        </p>
      )}
    </main>
  )
}
