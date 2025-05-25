'use client'

import { Reply } from '@/lib/type'
import { FunctionComponent } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ReviewCard from '../components/review-card'
import { useComments } from '../hooks/use-comments'
import { ModifyCommentModalContextProvider } from '../hooks/use-modify-comment-context'
import { ModifyCommentFormProvider } from '../hooks/modify-comment-context'

const CommentSection: FunctionComponent = () => {
  const { data, next, hasMore, isLoading, error } = useComments()
  if (isLoading)
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div>로딩 중...</div>
      </div>
    )

  if (!data) return null

  return (
    <main className="max-h-[40vh] min-h-[40vh] overflow-y-auto  border-gray-300 bg-gray-50 ">
      <h2 className="text-lg font-bold text-gray-700">댓글</h2>
      <InfiniteScroll
        dataLength={data.length}
        next={next}
        hasMore={hasMore}
        loader={
          <div className="flex items-center justify-center">로딩 중...</div>
        }
      >
        <section className="flex flex-col gap-2 p-4">
          {data.map((page) =>
            page?.comments?.map((comment: Reply) => (
              <ModifyCommentModalContextProvider>
                <ModifyCommentFormProvider>
                  <ReviewCard
                    reply={{
                      replyId: comment.replyId,
                      comment: comment.comment,
                      userId: comment.userId,
                      nickname: comment.nickname,
                      email: comment.email,
                      updatedAt: new Date(comment.updatedAt),
                      createdAt: new Date(comment.createdAt),
                    }}
                    key={comment.replyId}
                  />
                </ModifyCommentFormProvider>
              </ModifyCommentModalContextProvider>
            )),
          )}
        </section>
      </InfiniteScroll>
      {error && (
        <div className="text-center text-red-500">
          데이터를 불러오는데 실패했습니다.
        </div>
      )}
    </main>
  )
}

export default CommentSection
