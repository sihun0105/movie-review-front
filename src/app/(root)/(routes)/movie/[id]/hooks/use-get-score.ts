import useSWR from 'swr'
import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'

interface UpdateScoreResult {
  id: string
  score: number
}

const getKey = (id: string) => {
  if (!id) return null
  return AppClientApiEndpoint.getScore(id)
}

const fetcher = async (url: string): Promise<UpdateScoreResult> => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    console.log(
      `[useGetScore] ${url}, error: ${res.status} [${res.statusText}]`,
    )
    throw new Error('An error occurred while fetching the data.')
  }
  const result = await res.json()
  if (!result.data) {
    throw new Error('An error occurred while fetching the data.')
  }
  return result.data
}

const useGetScore = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<UpdateScoreResult>(
    getKey(id),
    fetcher,
  )

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export { useGetScore }
