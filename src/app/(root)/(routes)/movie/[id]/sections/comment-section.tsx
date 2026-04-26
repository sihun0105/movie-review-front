'use client'

import { DmReviewCard, SectionHead } from '@/components/dm'
import { Reply } from '@/lib/type'
import { useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ModifyCommentModal } from '../components/modify-comment-modal'
import { ModifyCommentFormProvider } from '../hooks/modify-comment-context'
import { useComments } from '../hooks/use-comments'
import { useModifyCommentModalContext } from '../hooks/use-modify-comment-context'

const CommentSection: FunctionComponent = () => {
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
  if (isLoading)
    return (
      <div className="flex h-[40vh] items-center justify-center text-dm-text-muted">
        로딩 중...
      </div>
    )
  if (!data) return null

  const totalCount = data.reduce(
    (acc, page) => acc + (page?.comments?.length ?? 0),
    0,
  )

  return (
    <section className="bg-dm-bg px-4 pb-20 text-dm-text">
      <SectionHead meta={totalCount.toLocaleString()}>리뷰</SectionHead>
      <InfiniteScroll
        dataLength={data.length}
        next={next}
        hasMore={hasMore}
        loader={
          <div className="py-4 text-center font-dm-mono text-[11px] text-dm-text-faint">
            로딩 중...
          </div>
        }
      >
        <div>
          {data.map((page) =>
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
      <ModifyCommentFormProvider>
        <ModifyCommentModal />
      </ModifyCommentFormProvider>
      {error && (
        <div className="text-center text-dm-red">
          데이터를 불러오는데 실패했습니다.
        </div>
      )}
    </section>
  )
}

export default CommentSection
