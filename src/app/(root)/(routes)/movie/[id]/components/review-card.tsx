'use client'

import { Reply } from '@/lib/type'
import { Pencil, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import { useComments } from '../hooks/use-comments'
import { useModifyCommentModalContext } from '../hooks/use-modify-comment-context'
import { ModifyCommentModal } from './modify-comment-modal'

interface ReviewCardProps {
  reply: Reply
}

const ReviewCard: FunctionComponent<ReviewCardProps> = ({ reply }) => {
  const session = useSession()
  const { deleteComment } = useComments()
  const { setOpen, setComment, setReplyId } = useModifyCommentModalContext()
  const userId = session.data?.user?.id

  const handleModifyComment = () => {
    setReplyId(reply.id)
    setComment(reply.content)
    setOpen(true)
  }
  if (!reply) return null

  return (
    <div className="my-2 rounded border p-3 shadow-sm">
      <ModifyCommentModal />

      <div className="flex justify-between">
        <h4 className="font-bold">{reply.nickname}</h4>
        <div className="flex flex-row items-center justify-center gap-2">
          <span className="text-sm text-gray-500">
            {new Date(reply.updatedAt).toLocaleString()}
          </span>
          {userId && +userId === reply.userno && (
            <>
              <Pencil
                className="cursor-pointer"
                onClick={handleModifyComment}
              />
              <X
                className="cursor-pointer"
                onClick={() => deleteComment({ commentId: reply.id })}
              />
            </>
          )}
        </div>
      </div>
      <p className="mt-2">{reply.content}</p>
    </div>
  )
}

export default ReviewCard
