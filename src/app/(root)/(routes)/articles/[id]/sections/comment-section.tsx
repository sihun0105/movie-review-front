'use client'

import { DmReviewCard } from '@/components/dm'
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

  const handleModify = (reply: Reply) => {
    setReplyId(reply.id)
    setComment(reply.content)
    setOpen(true)
  }

  if (isLoading)
    return (
      <div className="flex h-[20vh] items-center justify-center font-mono text-[12px] text-muted-foreground">
        loading...
      </div>
    )

  if (!data) return null

  const totalCount = data[0]?.totalCount ?? 0

  return (
    <div className="px-4 pt-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="font-dm-display text-[16px] italic text-foreground">
          Comments
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {totalCount}
        </span>
      </div>

      <InfiniteScroll
        dataLength={data.length}
        next={next}
        hasMore={hasMore}
        loader={
          <div className="py-3 text-center font-mono text-[11px] text-muted-foreground">
            loading...
          </div>
        }
      >
        <div className="space-y-3">
          {data.map((page) =>
            page?.comments?.map((comment: Reply) => (
              <DmReviewCard
                key={comment.id}
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
                onModify={handleModify}
                userId={userId}
              />
            )),
          )}
        </div>
      </InfiniteScroll>

      <ModifyCommentFormProvider>
        <ModifyCommentModal />
      </ModifyCommentFormProvider>

      {error && (
        <div className="py-4 text-center font-mono text-[11px] text-primary">
          데이터를 불러오는데 실패했습니다.
        </div>
      )}
    </div>
  )
}

export default CommentSection
