'use client'

import { DmReviewCard, SectionHead } from '@/components/dm'
import { Reply } from '@/lib/type'
import { useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CommentForm } from '../components/comment-form'
import { ModifyCommentModal } from '../components/modify-comment-modal'
import { CommentFormProvider } from '../hooks/comment-form-context'
import { ModifyCommentFormProvider } from '../hooks/modify-comment-context'
import { useComments } from '../hooks/use-comments'
import { useModifyCommentModalContext } from '../hooks/use-modify-comment-context'

interface CommentSectionProps {
  id: string
}

const CommentSection: FunctionComponent<CommentSectionProps> = ({ id }) => {
  const { data, next, hasMore, isLoading, error } = useComments()
  const session = useSession()
  const userId = session.data?.user?.id
  const { deleteComment } = useComments()
  const { setOpen, setComment, setReplyId } = useModifyCommentModalContext()

  const handleModifyComment = (reply: Reply) => {
    setReplyId(reply.id)
    setComment(reply.content)
    setOpen(true)
  }

  const totalCount = data
    ? data.reduce((acc, page) => acc + (page?.comments?.length ?? 0), 0)
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
                <DmReviewCard
                  key={comment.id}
                  reply={{
                    id: comment.id,
                    content: comment.content,
                    userno: comment.userno,
                    nickname: comment.nickname,
                    updatedAt: new Date(comment.updatedAt),
                    createdAt: new Date(comment.createdAt),
                  }}
                  onDelete={() => deleteComment({ commentId: comment.id })}
                  onModify={handleModifyComment}
                  userId={userId}
                />
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
