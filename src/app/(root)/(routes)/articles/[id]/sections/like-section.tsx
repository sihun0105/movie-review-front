'use client'
import { FunctionComponent } from 'react'
import { useUpdateLike } from '../hooks/use-update-like'

interface LikeSectionProps {
  id: string
}

const LikeSection: FunctionComponent<LikeSectionProps> = ({ id }) => {
  const { data, update, isValidating } = useUpdateLike(+id)

  const likes = data?.likes || 0
  const dislikes = data?.dislikes || 0

  const handleLike = () => {
    update('like')
  }

  const handleDislike = () => {
    update('dislike')
  }

  return (
    <>
      <div className="mb-6 flex gap-4">
        <button
          onClick={handleLike}
          disabled={isValidating}
          className="rounded border px-3 py-1 hover:bg-gray-100"
        >
          👍 좋아요 ({likes})
        </button>
        <button
          onClick={handleDislike}
          disabled={isValidating}
          className="rounded border px-3 py-1 hover:bg-gray-100"
        >
          👎 싫어요 ({dislikes})
        </button>
      </div>
    </>
  )
}

export default LikeSection
