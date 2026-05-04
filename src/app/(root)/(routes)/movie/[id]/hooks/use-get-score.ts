import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'

interface UpdateScoreResult {
  id: string
  score: number
}

const getKey = (id: number, isAuthenticated: boolean) => {
  if (!id || !isAuthenticated) return null
  return AppClientApiEndpoint.getScore(id)
}

const fetcher = async (url: string): Promise<UpdateScoreResult> => {
  const res = await fetch(url, {
    method: 'GET',
  })
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  const result = await res.json()
  if (!result.data) {
    throw new Error('An error occurred while fetching the data.')
  }
  return result.data
}

const useGetScore = (id: number) => {
  const { data: session } = useSession()
  const { data, error, isLoading, mutate } = useSWR<UpdateScoreResult>(
    getKey(id, !!session),
    fetcher,
  )

  return {
    data,
    error,
    isLoading,
    mutate,
    isAuthenticated: !!session,
  }
}

export { useGetScore }
