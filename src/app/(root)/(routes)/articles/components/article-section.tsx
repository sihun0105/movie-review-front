'use client'

import { FunctionComponent } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ArticleCard from './article-card'
import { Article } from '@/lib/type'
import { useGetArticles } from '../hooks/use-get-articles'

const ArticleSection: FunctionComponent = () => {
  const { data, next, hasMore, isLoading, error } = useGetArticles()

  if (isLoading && data.length === 0)
    // 초기 로딩 상태 확인
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div>로딩 중...</div>
      </div>
    )

  if (!data || data.length === 0) return null // 데이터가 없을 경우 처리

  return (
    <main className="">
      <InfiniteScroll
        dataLength={data.length} // 평탄화된 데이터 길이 사용
        next={() => {
          next()
        }}
        hasMore={hasMore}
        loader={
          <div className="flex items-center justify-center">로딩 중...</div>
        }
      >
        <section className="flex flex-col gap-2">
          {data.map((article: Article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
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

export default ArticleSection
