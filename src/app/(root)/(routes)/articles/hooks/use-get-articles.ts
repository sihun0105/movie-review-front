import useSWRInfinite from 'swr/infinite'
import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'

const getKey = () => (pageIndex: number, previousPageData: any | null) => {
  if (previousPageData && !previousPageData.hasNext) return null
  return AppClientApiEndpoint.listArticles(pageIndex + 1)
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('게시글을 불러오지 못했습니다.')
  const result = await res.json()
  return result.data
}

export const useGetArticles = () => {
  const { data, setSize, mutate, error, isLoading, isValidating } =
    useSWRInfinite(getKey(), fetcher)

  const hasMore =
    Array.isArray(data) && data.length > 0
      ? data[data.length - 1].hasNext
      : false

  return {
    data,
    next: () => setSize((size) => size + 1),
    mutate,
    error,
    isLoading,
    isValidating,
    hasMore,
  }
}
