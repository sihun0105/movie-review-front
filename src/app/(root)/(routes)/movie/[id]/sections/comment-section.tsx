'use client'

import { DmReviewCard, SectionHead } from '@/components/dm'
import { Reply } from '@/lib/type'
import { useSession } from 'next-auth/react'
import { FunctionComponent, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CommentForm } from '../components/comment-form'
import { ModifyCommentModal } from '../components/modify-comment-modal'
import { ReplyCommentForm } from '../components/reply-comment-form'
import { CommentFormProvider } from '../hooks/comment-form-context'
import { ModifyCommentFormProvider } from '../hooks/modify-comment-context'
import { useComments } from '../hooks/use-comments'
import { useCommentReaction } from '../hooks/use-comment-reaction'
import { useModifyCommentModalContext } from '../hooks/use-modify-comment-context'

interface CommentSectionProps {
  id: string
}

const CommentSection: FunctionComponent<CommentSectionProps> = ({ id }) => {
  const { data, next, hasMore, isLoading, error, deleteComment, refresh } =
    useComments()
  const session = useSession()
  const userId = session.data?.user?.id
  const { reactComment } = useCommentReaction(() => refresh())
  const { setOpen, setComment, setReplyId } = useModifyCommentModalContext()
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const handleModifyComment = (reply: Reply) => {
    setReplyId(reply.id)
    setComment(reply.content)
    setOpen(true)
  }

  const totalCount = data
    ? data.reduce(
        (acc, page) =>
          acc +
          (page?.comments?.reduce(
            (count, comment) => count + 1 + (comment.replies?.length ?? 0),
            0,
          ) ?? 0),
        0,
      )
    : 0

  return (
    <section className="px-4 pb-10">
      <SectionHead meta={totalCount.toLocaleString()}>리뷰</SectionHead>

      <div className="mb-5 rounded-lg border border-border bg-card">
        <CommentFormProvider>
          <CommentForm id={id} />
        </CommentFormProvider>
      </div>

      {isLoading ? (
        <div className="flex h-[20vh] items-center justify-center font-mono text-[12px] text-muted-foreground">
          loading...
        </div>
      ) : (
        <InfiniteScroll
          dataLength={data?.length ?? 0}
          next={next}
          hasMore={hasMore}
          loader={
            <div className="py-3 text-center font-mono text-[11px] text-muted-foreground">
              loading...
            </div>
          }
        >
          <div>
            {data?.map((page) =>
              page?.comments?.map((comment: Reply) => (
                <div key={comment.id}>
                  <DmReviewCard
                    reply={comment}
                    onDelete={() => deleteComment({ commentId: comment.id })}
                    onModify={handleModifyComment}
                    onReply={() => setReplyingTo(comment.id)}
                    onReact={(reaction) =>
                      reactComment({ commentId: comment.id, reaction })
                    }
                    userId={userId}
                  />
                  {replyingTo === comment.id && (
                    <ReplyCommentForm
                      movieId={id}
                      parent={comment}
                      onClose={() => setReplyingTo(null)}
                    />
                  )}
                  {comment.replies?.map((child) => (
                    <div key={child.id} className="ml-7">
                      <DmReviewCard
                        reply={child}
                        nested
                        onDelete={() => deleteComment({ commentId: child.id })}
                        onModify={handleModifyComment}
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
      )}

      <ModifyCommentFormProvider>
        <ModifyCommentModal />
      </ModifyCommentFormProvider>

      {error && (
        <div className="py-4 text-center font-mono text-[11px] text-destructive">
          데이터를 불러오는데 실패했습니다.
        </div>
      )}
    </section>
  )
}

export default CommentSection
