'use client'

import { useGetScore } from '@/app/(root)/(routes)/movie/[id]/hooks/use-get-score'
import { useRouter } from 'next/navigation'

interface RatingInputProps {
  movieCd: number
}

export function RatingInput({ movieCd }: RatingInputProps) {
  const { data, isAuthenticated, mutate } = useGetScore(movieCd)
  const router = useRouter()
  const myScore = data?.score ?? 0

  const handle = async (score: number) => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    try {
      mutate(
        { ...(data || { id: String(movieCd), score: 0 }), score },
        false,
      )
      const res = await fetch(`/api/score/${movieCd}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score }),
      })
      if (!res.ok) throw new Error('업데이트 실패')
      mutate()
    } catch {
      mutate()
    }
  }

  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.5px] text-muted-foreground">
        내 별점
      </div>
      <div className="mt-1 flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => {
          const active = i <= myScore
          return (
            <button
              key={i}
              onClick={() => handle(i)}
              aria-label={`${i}점 주기`}
              className="cursor-pointer border-none bg-transparent p-0"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill={active ? 'var(--dm-amber)' : 'none'}
                stroke={active ? 'var(--dm-amber)' : 'var(--dm-line-2)'}
                strokeWidth="1.3"
              >
                <path
                  d="M8 1.5l2 4.5 5 .5-3.8 3.3 1.1 4.8L8 12l-4.3 2.6L4.8 9.8 1 6.5l5-.5 2-4.5z"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )
        })}
      </div>
      <div
        className={`mt-1 text-[10px] ${myScore ? 'text-yellow-400' : 'text-muted-foreground'}`}
      >
        {myScore ? `${myScore}점 주셨어요` : '별점을 남겨주세요'}
      </div>
    </div>
  )
}
