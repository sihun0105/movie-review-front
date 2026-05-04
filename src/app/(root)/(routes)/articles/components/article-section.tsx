'use client'

import { Article } from '@/lib/type'
import { FunctionComponent } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ArticleCard from './article-card'
import { useGetArticles } from '../hooks/use-get-articles'

const ArticleSection: FunctionComponent = () => {
  const { data, next, hasMore, isLoading, error } = useGetArticles()

  if (isLoading && data.length === 0)
    return (
      <div className="flex h-[40vh] items-center justify-center font-mono text-[12px] text-muted-foreground">
        loading...
      </div>
    )

  if (!data || data.length === 0) return null

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={next}
      hasMore={hasMore}
      loader={
        <div className="py-4 text-center font-mono text-[11px] text-muted-foreground">
          loading...
        </div>
      }
    >
      <div>
        {data.map((article: Article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {error && (
        <div className="py-4 text-center font-mono text-[11px] text-primary">
          데이터를 불러오는데 실패했습니다.
        </div>
      )}
    </InfiniteScroll>
  )
}

export default ArticleSection
