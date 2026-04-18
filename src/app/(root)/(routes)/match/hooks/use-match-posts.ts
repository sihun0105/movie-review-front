import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { MatchPostResponse } from '@/lib/type'
import useSWRInfinite from 'swr/infinite'

const fetcher = async (url: string): Promise<MatchPostResponse> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch match posts')
  }

  return await response.json()
}

/** 매치 게시글 목록 key */
const getKey =
  (pageSize: number = 10) =>
  (pageIndex: number, previousPageData: MatchPostResponse | null) => {
    if (previousPageData && !previousPageData.hasNext) return null
    return AppClientApiEndpoint.getMatchPosts(pageIndex + 1, pageSize)
  }

export const useMatchPosts = (pageSize: number = 10) => {
  const { data, setSize, mutate, error, isLoading, isValidating } =
    useSWRInfinite<MatchPostResponse>(getKey(pageSize), fetcher, {
      refreshInterval: 30000, // 30초마다 새로고침
      revalidateOnFocus: true,
    })

  // 모든 페이지의 matchPosts를 평면화
  const matchPosts = data ? data.flatMap((page) => page.matchPosts) : []

  // 다음 페이지가 있는지 확인
  const hasMore =
    Array.isArray(data) && data.length > 0
      ? data[data.length - 1].hasNext
      : false

  // 다음 페이지 로드
  const loadMore = () => setSize((size) => size + 1)

  return {
    matchPosts,
    hasMore,
    loadMore,
    isLoading,
    isValidating,
    error,
    mutate,
  }
}
