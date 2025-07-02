'use client'

import { Reply } from '@/lib/type'
import { Calendar, Pencil, User2, X } from 'lucide-react'
import { FunctionComponent, ReactNode } from 'react'

interface ReviewCardProps {
  reply: Reply
  userId?: number | string
  onModify?: (reply: Reply) => void
  onDelete?: (reply: Reply) => void
  ModifyModal?: ReactNode
}

const ReviewCard: FunctionComponent<ReviewCardProps> = ({
  reply,
  userId,
  onModify,
  onDelete,
  ModifyModal,
}) => {
  if (!reply) return null

  return (
    <div className="my-4 rounded-xl border bg-white p-5 shadow-sm">
      {ModifyModal}
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
            {onModify && (
              <Pencil
                className="h-4 w-4 cursor-pointer text-gray-400 transition hover:text-blue-600"
                onClick={() => onModify(reply)}
              />
            )}
            {onDelete && (
              <X
                className="h-4 w-4 cursor-pointer text-gray-400 transition hover:text-red-500"
                onClick={() => onDelete(reply)}
              />
            )}
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
