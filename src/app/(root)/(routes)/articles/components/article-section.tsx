'use client'

import { FunctionComponent } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ArticleCard from './article-card'
import { Article } from '@/lib/type'
import { useGetArticles } from '../hooks/use-get-articles'

const ArticleSection: FunctionComponent = () => {
  const { data, next, hasMore, isLoading, error } = useGetArticles()

  if (isLoading)
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div>로딩 중...</div>
      </div>
    )

  if (!data) return null

  return (
    <main className="max-h-[40vh] min-h-[40vh] overflow-y-auto">
      <InfiniteScroll
        dataLength={data.length}
        next={next}
        hasMore={hasMore}
        loader={
          <div className="flex items-center justify-center">로딩 중...</div>
        }
      >
        <section className="flex flex-col gap-2">
          {data.map((page) =>
            page?.articles?.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
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

export default ArticleSection
