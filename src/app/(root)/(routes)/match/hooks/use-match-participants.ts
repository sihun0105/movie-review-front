import { MatchParticipant } from '@/lib/type'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) throw new Error('Failed to fetch match participants')
  return await response.json()
}

export function useMatchParticipants(matchId: string) {
  const { data, error, isLoading } = useSWR<{
    participants: MatchParticipant[]
  }>(matchId ? `/api/match/${matchId}/participants` : null, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    participants: data?.participants ?? [],
    isLoading,
    error,
  }
}
