'use client'
import { FunctionComponent, useState } from 'react'
import { useUpdateLike } from '../hooks/use-update-like'
import type { LikeState } from '@/lib/type'

interface LikeSectionProps {
  id: string
}

const LikeSection: FunctionComponent<LikeSectionProps> = ({ id }) => {
  const { data, update, isValidating } = useUpdateLike(+id)
  const [selected, setSelected] = useState<LikeState | null>(null)

  const likes = data?.likes || 0
  const dislikes = data?.dislikes || 0

  const handleLike = () => {
    setSelected('like')
    update('like')
  }

  const handleDislike = () => {
    setSelected('dislike')
    update('dislike')
  }

  return (
    <>
      <div className="mb-6 flex gap-4">
        <button
          onClick={handleLike}
          disabled={isValidating}
          className={`rounded border px-3 py-1 hover:bg-gray-100 ${selected === 'like' ? 'border-blue-400 bg-blue-100' : ''}`}
        >
          👍 좋아요 ({likes})
        </button>
        <button
          onClick={handleDislike}
          disabled={isValidating}
          className={`rounded border px-3 py-1 hover:bg-gray-100 ${selected === 'dislike' ? 'border-red-400 bg-red-100' : ''}`}
        >
          👎 싫어요 ({dislikes})
        </button>
      </div>
    </>
  )
}

export default LikeSection
