'use client'
import { X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import { useDeleteComment } from '../hooks/use-delete-comment'
import { Reply } from '@/lib/type'

interface ReviewCardProps {
  reply: Reply
  movieId: number
}

const ReviewCard: FunctionComponent<ReviewCardProps> = ({ reply, movieId }) => {
  const session = useSession()
  const { deleteComment } = useDeleteComment(movieId)

  if (!reply) return null

  const userId = session.data?.user?.id

  return (
    <div className="my-2 rounded border p-3 shadow-sm">
      <div className="flex justify-between">
        <h4 className="font-bold">{reply.nickname}</h4>
        <div className="flex flex-row items-center justify-center gap-2">
          <span className="text-sm text-gray-500">
            {new Date(reply.updatedAt).toLocaleString()}
          </span>
          {userId && +userId === reply.userId && (
            <X
              className="cursor-pointer"
              onClick={() => deleteComment({ commentId: reply.replyId })}
            />
          )}
        </div>
      </div>
      <p className="mt-2">{reply.comment}</p>
    </div>
  )
}

export default ReviewCard
