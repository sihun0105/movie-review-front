'use client'

import { Reply } from '@/lib/type'
import { Calendar, Pencil, User2, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import { useArticleComments } from '../hooks/use-comments'
import { useModifyCommentModalContext } from '../hooks/use-modify-comment-context'
import { ModifyCommentModal } from './modify-comment-modal'

interface ReviewCardProps {
  reply: Reply
}

const ReviewCard: FunctionComponent<ReviewCardProps> = ({ reply }) => {
  const session = useSession()
  const { deleteComment } = useArticleComments()
  const { setOpen, setComment, setReplyId } = useModifyCommentModalContext()
  const userId = session.data?.user?.id

  const handleModifyComment = () => {
    setReplyId(reply.id)
    setComment(reply.content)
    setOpen(true)
  }
  if (!reply) return null

  return (
    <div className="my-4 rounded-xl border bg-white p-5 shadow-sm">
      <ModifyCommentModal />

      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1 text-sm text-gray-600">
            <User2 className="h-4 w-4 text-gray-400" />
            {reply.nickname}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="h-4 w-4 text-gray-300" />
            {new Date(reply.updatedAt).toLocaleString()}
          </span>
        </div>
        {userId && +userId === reply.userno && (
          <div className="flex gap-2">
            <Pencil
              className="h-4 w-4 cursor-pointer text-gray-400 transition hover:text-blue-600"
              onClick={handleModifyComment}
            />
            <X
              className="h-4 w-4 cursor-pointer text-gray-400 transition hover:text-red-500"
              onClick={() => deleteComment({ commentId: reply.id })}
            />
          </div>
        )}
      </div>
      <div className="text-base leading-relaxed text-gray-900">
        {reply.content}
      </div>
    </div>
  )
}

export default ReviewCard
