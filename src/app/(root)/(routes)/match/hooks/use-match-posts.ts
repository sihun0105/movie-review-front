import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { MatchPostResponse } from '@/lib/type'
import useSWR from 'swr'

const fetcher = async (url: string) => {
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

export const useMatchPosts = (page: number = 1, pageSize: number = 10) => {
  const { data, error, isLoading, mutate } = useSWR<MatchPostResponse>(
    AppClientApiEndpoint.getMatchPosts(page, pageSize),
    fetcher,
    {
      refreshInterval: 30000, // 30초마다 새로고침
      revalidateOnFocus: true,
    },
  )

  return {
    matchPosts: data?.matchPosts || [],
    hasNext: data?.hasNext || false,
    isLoading,
    error,
    mutate,
  }
}
