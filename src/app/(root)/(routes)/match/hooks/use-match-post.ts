import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { MatchPost } from '@/lib/type'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch match post')
  }

  return await response.json()
}

export const useMatchPost = (matchId: string) => {
  const { data, error, isLoading, mutate } = useSWR<{ matchPost: MatchPost }>(
    matchId ? AppClientApiEndpoint.getMatchPost(matchId) : null,
    fetcher,
    {
      refreshInterval: 0, // 상세 페이지는 자동 새로고침 안함
      revalidateOnFocus: false,
    },
  )

  return {
    matchPost: data?.matchPost,
    isLoading,
    error,
    mutate,
  }
}
