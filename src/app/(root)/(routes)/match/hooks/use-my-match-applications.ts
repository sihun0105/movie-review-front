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
    throw new Error('Failed to fetch my applications')
  }

  return await response.json()
}

export const useMyMatchApplications = () => {
  const { data, error, isLoading, mutate } = useSWR<{
    applications: MatchApplication[]
  }>('/api/match/my-applications', fetcher, {
    refreshInterval: 10000, // 10초마다 새로고침
    revalidateOnFocus: true,
  })

  return {
    applications: data?.applications || [],
    isLoading,
    error,
    mutate,
  }
}
