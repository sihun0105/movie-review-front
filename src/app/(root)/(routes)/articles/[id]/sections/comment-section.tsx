'use client'

import ReviewCard from '@/components/app/app-review-card'
import { Reply } from '@/lib/type'
import { useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ModifyCommentModal } from '../components/modify-comment-modal'
import { ModifyCommentFormProvider } from '../hooks/modify-comment-context'
import { useArticleComments } from '../hooks/use-article-comments'
import { useDeleteArticleComment } from '../hooks/use-delete-article-comment'
import { useModifyCommentModalContext } from '../hooks/use-modify-comment-context'

const CommentSection: FunctionComponent = () => {
  const { data, next, hasMore, isLoading, error, mutate } = useArticleComments()
  const session = useSession()
  const { deleteComment, isDeletingComment } = useDeleteArticleComment(mutate)
  const { setOpen, setComment, setReplyId } = useModifyCommentModalContext()
  const userId = session.data?.user?.id

  const handleModifyComment = (reply: Reply) => {
    setReplyId(reply.id)
    setComment(reply.content)
    setOpen(true)
  }
  if (isLoading)
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div>로딩 중...</div>
      </div>
    )

  if (!data) return null

  return (
    <main className="border-gray-300  ">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
        <span className="flex items-center gap-1">
          <svg
            className="h-6 w-6 flex-shrink-0 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.8-3.6A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          댓글
        </span>
        <span className="ml-1 rounded bg-blue-50 px-2 py-0.5 text-base font-semibold text-blue-600">
          {data[0].totalCount}개
        </span>
      </h2>
      <InfiniteScroll
        dataLength={data.length}
        next={next}
        hasMore={hasMore}
        loader={
          <div className="flex items-center justify-center">로딩 중...</div>
        }
      >
        <ul className="space-y-3 ">
          {data.map((page) =>
            page?.comments?.map((comment: Reply) => (
              <li key={comment.id}>
                <ReviewCard
                  reply={{
                    id: comment.id,
                    content: comment.content,
                    userno: comment.userno,
                    nickname: comment.nickname,
                    avatar: comment.avatar,
                    updatedAt: new Date(comment.updatedAt),
                    createdAt: new Date(comment.createdAt),
                  }}
                  onDelete={
                    isDeletingComment
                      ? undefined
                      : () => deleteComment({ commentId: comment.id })
                  }
                  onModify={handleModifyComment}
                  userId={userId}
                />
              </li>
            )),
          )}
        </ul>
      </InfiniteScroll>
      <ModifyCommentFormProvider>
        <ModifyCommentModal />
      </ModifyCommentFormProvider>
      {error && (
        <div className="text-center text-red-500">
          데이터를 불러오는데 실패했습니다.
        </div>
      )}
    </main>
  )
}

export default CommentSection
