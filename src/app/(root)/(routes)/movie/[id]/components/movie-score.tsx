'use client'

import { FunctionComponent } from 'react'
import { FaBeer } from 'react-icons/fa'
import { useGetScore } from '../hooks/use-get-score'
import { useUpdateScore } from '../hooks/use-update-score'

interface MovieScoreProps {
  movieCd: number
}

const MovieScore: FunctionComponent<MovieScoreProps> = ({ movieCd }) => {
  const { data } = useGetScore(movieCd)
  const { update } = useUpdateScore()
  const handleUpdateScore = (movieCd: number, score: number) => {
    update(movieCd, score)
  }
  if (!movieCd || !data) return null

  return (
    <>
      {/* 별점 시스템 */}
      <div className="mt-4 flex items-center gap-2 text-yellow-400">
        {[1, 2, 3, 4, 5].map((index) => (
          <FaBeer
            key={index}
            className={`cursor-pointer text-3xl transition ${index <= data.score ? 'text-yellow-500' : 'text-gray-600'}`}
            onClick={() => handleUpdateScore(movieCd, index)}
          />
        ))}
      </div>
    </>
  )
}

export default MovieScore
