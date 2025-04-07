'use client'
import { FunctionComponent } from 'react'
import { useGetComments } from '../hooks/use-get-comment'
import InfiniteScroll from 'react-infinite-scroll-component'
import ReviewCard from '../components/review-card'

interface CommentSectionProps {}

const CommentSection: FunctionComponent<CommentSectionProps> = ({}) => {
  const { data, next, hasMore, isLoading, error } = useGetComments()
  if (isLoading)
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div>로딩 중...</div>
      </div>
    )

  if (!data) return null

  return (
    <main className="max-h-[40vh] min-h-[40vh] overflow-y-auto border-t border-gray-300 bg-gray-50 p-4">
      <h2 className="mb-4 text-lg font-bold text-gray-700">댓글</h2>
      <InfiniteScroll
        dataLength={data.length}
        next={next}
        hasMore={hasMore}
        loader={
          <div className="flex items-center justify-center">로딩 중...</div>
        }
      >
        <section className="grid gap-4">
          {data.map((pageData: any) =>
            pageData.map((comment: any, idx: any) => (
              <ReviewCard comment={comment} key={idx} />
            )),
          )}
        </section>
      </InfiniteScroll>
      {error && (
        <div className="mt-4 text-center text-red-500">
          데이터를 불러오는데 실패했습니다.
        </div>
      )}
    </main>
  )
}

export default CommentSection
