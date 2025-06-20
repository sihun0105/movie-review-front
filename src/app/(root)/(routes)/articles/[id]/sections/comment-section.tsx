'use client'

import { ArticleReply } from '@/lib/type'
import { FunctionComponent } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ModifyCommentModalContextProvider } from '../hooks/use-modify-comment-context'
import { ModifyCommentFormProvider } from '../hooks/modify-comment-context'
import ReviewCard from '../components/review-card'
import { useArticleComments } from '../hooks/use-comments'

const CommentSection: FunctionComponent = () => {
  const { data, next, hasMore, isLoading, error } = useArticleComments()
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
            page?.comments?.map((comment: ArticleReply) => (
              <li key={comment.id}>
                <ModifyCommentModalContextProvider>
                  <ModifyCommentFormProvider>
                    <ReviewCard
                      reply={{
                        id: comment.id,
                        content: comment.content,
                        userno: comment.userno,
                        nickname: comment.nickname,
                        avatar: comment.avatar,
                        articleId: comment.articleId,
                        updatedAt: new Date(comment.updatedAt),
                        createdAt: new Date(comment.createdAt),
                      }}
                    />
                  </ModifyCommentFormProvider>
                </ModifyCommentModalContextProvider>
              </li>
            )),
          )}
        </ul>
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
