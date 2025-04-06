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
  const { update } = useUpdateScore(movieCd)
  const handleUpdateScore = (score: number) => {
    update(score)
  }
  return (
    <>
      {/* 별점 시스템 */}
      <div className="mt-4 flex items-center gap-2 text-yellow-400">
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
    </>
  )
}

export default MovieScore
