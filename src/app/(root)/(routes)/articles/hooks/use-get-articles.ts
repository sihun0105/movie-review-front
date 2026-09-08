import useSWRInfinite from 'swr/infinite'
import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import type { Article } from '@/lib/type'

export interface ArticlePageData {
  articles: Article[]
  hasNext: boolean
}

const getKey =
  (startPage: number) =>
  (pageIndex: number, previousPageData: ArticlePageData | null) => {
    if (previousPageData && !previousPageData.hasNext) return null
    return AppClientApiEndpoint.listArticles(startPage + pageIndex)
  }

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('게시글을 불러오지 못했습니다.')
  const result = await res.json()
  return result.data
}

export const useGetArticles = (
  initialData?: ArticlePageData,
  startPage = 1,
) => {
  const { data, setSize, error, isLoading, isValidating } =
    useSWRInfinite<ArticlePageData>(getKey(startPage), fetcher, {
      fallbackData: initialData ? [initialData] : undefined,
    })

  const isEmpty = data?.[0]?.articles?.length === 0
  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.hasNext)

  const next = () => {
    setSize((size) => {
      return size + 1
    })
  }

  return {
    data: data?.flatMap((page) => page.articles) || [],
    next,
    error,
    isLoading,
    isValidating,
    hasMore: !isReachingEnd,
  }
}
