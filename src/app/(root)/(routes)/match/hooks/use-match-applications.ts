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
    throw new Error('Failed to fetch match applications')
  }

  return await response.json()
}

export const useMatchApplications = (matchId: string) => {
  const { data, error, isLoading, mutate } = useSWR<{
    applications: MatchApplication[]
  }>(
    matchId ? AppClientApiEndpoint.getMatchApplications(matchId) : null,
    fetcher,
    {
      refreshInterval: 10000, // 10초마다 새로고침 (신청 상태 확인)
      revalidateOnFocus: true,
    },
  )

  return {
    applications: data?.applications || [],
    isLoading,
    error,
    mutate,
  }
}
