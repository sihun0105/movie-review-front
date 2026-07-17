'use client'

import { DmReviewCard } from '@/components/dm'
import { Reply } from '@/lib/type'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { FunctionComponent, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ModifyCommentModal } from '../components/modify-comment-modal'
import { ReplyCommentForm } from '../components/reply-comment-form'
import { ModifyCommentFormProvider } from '../hooks/modify-comment-context'
import { useArticleComments } from '../hooks/use-article-comments'
import { useDeleteArticleComment } from '../hooks/use-delete-article-comment'
import { useModifyCommentModalContext } from '../hooks/use-modify-comment-context'
import { useArticleCommentReaction } from '../hooks/use-article-comment-reaction'

const CommentSection: FunctionComponent = () => {
  const { data, next, hasMore, isLoading, error, mutate } = useArticleComments()
  const session = useSession()
  const { deleteComment, isDeletingComment } = useDeleteArticleComment(mutate)
  const { setOpen, setComment, setReplyId } = useModifyCommentModalContext()
  const userId = session.data?.user?.id
  const articleId = String(useParams()?.id ?? '')
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const { reactComment } = useArticleCommentReaction(() => mutate())

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
        <span className="text-[15px] font-semibold text-foreground">댓글</span>
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
              <div key={comment.id}>
                <DmReviewCard
                  reply={comment}
                  onDelete={
                    isDeletingComment
                      ? undefined
                      : () => deleteComment({ commentId: comment.id })
                  }
                  onModify={handleModify}
                  onReply={() => setReplyingTo(comment.id)}
                  onReact={(reaction) =>
                    reactComment({ commentId: comment.id, reaction })
                  }
                  userId={userId}
                />
                {replyingTo === comment.id && (
                  <ReplyCommentForm
                    articleId={articleId}
                    parent={comment}
                    onClose={() => setReplyingTo(null)}
                  />
                )}
                {comment.replies?.map((child) => (
                  <div key={child.id} className="ml-7">
                    <DmReviewCard
                      reply={child}
                      nested
                      onDelete={
                        isDeletingComment
                          ? undefined
                          : () => deleteComment({ commentId: child.id })
                      }
                      onModify={handleModify}
                      onReact={(reaction) =>
                        reactComment({ commentId: child.id, reaction })
                      }
                      userId={userId}
                    />
                  </div>
                ))}
              </div>
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
