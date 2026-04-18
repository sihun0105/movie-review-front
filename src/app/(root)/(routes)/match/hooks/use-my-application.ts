import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { MatchApplication } from '@/lib/type'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    if (response.status === 404) {
      // 신청하지 않은 경우 404 반환
      return null
    }
    throw new Error('Failed to fetch my application')
  }

  return await response.json()
}

export const useMyApplication = (matchId: string) => {
  const { data, error, isLoading, mutate } = useSWR<{
    application: MatchApplication | null
  }>(matchId ? AppClientApiEndpoint.getMyApplication(matchId) : null, fetcher, {
    refreshInterval: 10000, // 10초마다 새로고침
    revalidateOnFocus: true,
  })

  return {
    application: data?.application || null,
    isLoading,
    error,
    mutate,
  }
}
