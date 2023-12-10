import { FunctionComponent } from 'react'
import { Comment } from '@/modules/comment/comment-entity'

interface ReviewCardProps {
  comment: Comment
}

const ReviewCard: FunctionComponent<ReviewCardProps> = ({ comment }) => {
  return (
    <div className="my-2 rounded border p-3 shadow-sm">
      <div className="flex justify-between">
        <h4 className="font-bold">{comment.userName}</h4>
        <span className="text-sm text-gray-500">
          {new Date(comment.updatedAt).toLocaleString()}
        </span>
      </div>
      <p className="mt-2">{comment.comment}</p>
    </div>
  )
}

export default ReviewCard
