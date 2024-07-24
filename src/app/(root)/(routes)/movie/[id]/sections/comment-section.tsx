'use client';
import { FunctionComponent } from 'react'
import { useGetComments } from '../hooks/use-get-comment'
import InfiniteScroll from 'react-infinite-scroll-component'
import ReviewCard from '../components/review-card'
interface CommentSectionProps {}

const CommentSection: FunctionComponent<CommentSectionProps> = ({}) => {
  const { data, next, hasMore, isLoading,error } = useGetComments()
  if (isLoading)
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div>loading...</div>
      </div>
    )
  if (!data) return null
  return (
    <main>
      <InfiniteScroll
        dataLength={data.length}
        next={next}
        hasMore={hasMore}
        loader={
          <div className="flex h-[40px] w-full items-center justify-center">
            
          </div>
        }
      >
        <section className="mt-3 grid gap-1">  
          {
          data.map((pageData:any) => 
            pageData.map((comment: any, idx: any) => (
              <ReviewCard comment={comment} key={idx} />
            )),
          )
        }
        </section>
      </InfiniteScroll>
      {error && <div className="m-2">데이터를 불러오는데 실패했습니다.</div>}
    </main>
  )
}

export default CommentSection
