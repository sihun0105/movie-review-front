import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { MatchPostResponse } from '@/lib/type'
import useSWRInfinite from 'swr/infinite'

export type MatchPostFilter = 'all' | 'available' | 'week' | 'mine'

interface MatchPostQuery {
  movieTitle?: string
  filter?: MatchPostFilter
  userno?: number | null
}

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
  (pageSize: number = 10, query: MatchPostQuery = {}) =>
  (pageIndex: number, previousPageData: MatchPostResponse | null) => {
    if (previousPageData && !previousPageData.hasNext) return null
    if (query.filter === 'mine' && !query.userno) return null
    const url = AppClientApiEndpoint.getMatchPosts(pageIndex + 1, pageSize)
    const params = new URLSearchParams()
    if (query.movieTitle) params.set('movieTitle', query.movieTitle)
    if (query.filter && query.filter !== 'all') params.set('filter', query.filter)
    if (query.filter === 'mine' && query.userno) {
      params.set('userno', String(query.userno))
    }
    const filterQuery = params.toString()
    return filterQuery ? `${url}&${filterQuery}` : url
  }

export const useMatchPosts = (
  pageSize: number = 10,
  query: MatchPostQuery = {},
) => {
  const { data, setSize, mutate, error, isLoading, isValidating } =
    useSWRInfinite<MatchPostResponse>(getKey(pageSize, query), fetcher, {
      refreshInterval: 30000, // 30초마다 새로고침
      revalidateOnFocus: true,
    })

  // 모든 페이지의 matchPosts를 평면화 (null/undefined 방어)
  const matchPosts = data
    ? data.flatMap((page) => page?.matchPosts ?? []).filter(
        (m): m is NonNullable<typeof m> => m != null,
      )
    : []

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
