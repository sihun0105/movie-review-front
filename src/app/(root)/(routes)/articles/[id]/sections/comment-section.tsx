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
      <h2 className="text-lg font-bold text-gray-700">댓글</h2>
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
