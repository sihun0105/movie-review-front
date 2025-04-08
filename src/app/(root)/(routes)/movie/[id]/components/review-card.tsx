'use client'
import { FunctionComponent } from 'react'
import { Comment } from '@/modules/comment/comment-entity'
import { X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useDeleteComment } from '../hooks/use-delete-comment'

interface ReviewCardProps {
  comment: Comment
}

const ReviewCard: FunctionComponent<ReviewCardProps> = ({ comment }) => {
  const session = useSession()
  const { deleteComment } = useDeleteComment(comment.id)

  if (!comment) return null

  const handleSubmit = async () => {
    await deleteComment(
      {
        commentId: comment.id,
      },
      {
        onSuccess: async () => {
          alert('성공적으로 삭제되었습니다.')
          window.location.reload()
        },
        onError: () => {
          alert('삭제에 실패하였습니다.')
        },
      },
    )
  }

  const userId = session.data?.user?.id

  return (
    <div className="my-2 rounded border p-3 shadow-sm">
      <div className="flex justify-between">
        <h4 className="font-bold">{comment.userName}</h4>
        <div className="flex flex-row items-center justify-center gap-2">
          <span className="text-sm text-gray-500">
            {new Date(comment.updatedAt).toLocaleString()}
          </span>
          {userId && +userId === comment.userId && (
            <X className="cursor-pointer" onClick={handleSubmit} />
          )}
        </div>
      </div>
      <p className="mt-2">{comment.comment}</p>
    </div>
  )
}

export default ReviewCard
