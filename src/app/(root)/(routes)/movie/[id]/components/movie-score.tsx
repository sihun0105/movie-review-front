'use client'

import { FunctionComponent } from 'react'
import { FaBeer } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useGetScore } from '../hooks/use-get-score'

interface MovieScoreProps {
  movieCd: number
}

const MovieScore: FunctionComponent<MovieScoreProps> = ({ movieCd }) => {
  const { data, isAuthenticated, mutate } = useGetScore(movieCd)
  const router = useRouter()

  const handleUpdateScore = async (score: number) => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    try {
      // 낙관적 업데이트
      const optimisticData = {
        ...(data || { id: String(movieCd), score: 0 }),
        score,
      }
      mutate(optimisticData, false)

      // 실제 API 호출
      const url = `/api/score/${movieCd}`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score }),
      })

      if (!res.ok) {
        throw new Error('업데이트 실패')
      }

      // 데이터 재검증
      mutate()
    } catch (error) {
      console.error('점수 업데이트 실패:', error)
      mutate() // 오류 시 원래 데이터로 롤백
    }
  }

  // 로그인하지 않은 경우 안내 메시지 표시
  if (!isAuthenticated) {
    return (
      <div className="mt-4 text-center">
        <div className="mb-2 text-gray-500">로그인 후 평가해주세요</div>
        <div className="flex items-center justify-center gap-2 text-gray-400">
          {[1, 2, 3, 4, 5].map((index) => (
            <FaBeer
              key={index}
              className="cursor-pointer text-3xl transition hover:text-gray-300"
              onClick={() => router.push('/login')}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 text-center">
      {/* 별점 시스템 */}
      <div className="flex items-center justify-center gap-2 text-yellow-400">
        {[1, 2, 3, 4, 5].map((index) =>
          data ? (
            <FaBeer
              key={index}
              className={`cursor-pointer text-3xl transition ${index <= data.score ? 'text-yellow-500' : 'text-gray-600'}`}
              onClick={() => handleUpdateScore(index)}
            />
          ) : (
            <FaBeer
              key={index}
              className={`cursor-pointer text-3xl transition ${index <= 0 ? 'text-yellow-500' : 'text-gray-600'}`}
              onClick={() => handleUpdateScore(index)}
            />
          ),
        )}
      </div>
    </div>
  )
}

export default MovieScore
