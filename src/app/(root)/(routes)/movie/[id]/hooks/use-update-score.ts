import { throttle } from 'lodash'
import useSWR from 'swr'
import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { useAppToast } from '@/hooks/use-app-toast'
import { useAuthenticationCheck } from '@/hooks/use-authentication-check'

interface UpdateScoreResult {
  id: number
  score: number
}

const getKey = (id: number) => (id ? AppClientApiEndpoint.getScore(id) : null)

const fetcher = async (url: string): Promise<UpdateScoreResult> => {
  const res = await fetch(url)
  if (!res.ok) {
    console.log(
      `[useUpdateScore] ${url}, error: ${res.status} [${res.statusText}]`,
    )
    throw new Error('Failed to fetch score data.')
  }
  const result = await res.json()
  return result.data
}

const throttledUpdateScore = throttle(async (id: number, score: number) => {
  const url = AppClientApiEndpoint.updateScore(id)
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ score }),
  })

  if (!res.ok) {
    console.log(
      `[useUpdateScore] ${url}, error: ${res.status} [${res.statusText}]`,
    )
    throw new Error('Failed to update score.')
  }

  const result = await res.json()
  return result.data
}, 500)

const useUpdateScore = (id: number) => {
  const { showToast } = useAppToast()
  const { requireAuthentication } = useAuthenticationCheck()

  const { data, mutate, error, isValidating } = useSWR<UpdateScoreResult>(
    getKey(id),
    fetcher,
  )

  const optimisticUpdate = (newScore: number): UpdateScoreResult => ({
    ...(data || { id, score: 0 }),
    score: newScore,
  })

  const handleUpdate = requireAuthentication((newScore: number) => {
    const optimisticData = optimisticUpdate(newScore)

    mutate(
      async () => {
        await throttledUpdateScore(id, newScore)
        showToast('점수가 성공적으로 업데이트되었습니다.')
        return optimisticData
      },
      {
        optimisticData,
        revalidate: false,
        rollbackOnError: () => {
          showToast('점수 업데이트에 실패했습니다.')
          return true
        },
      },
    )
  })

  return {
    data,
    update: handleUpdate,
    error,
    isValidating,
  }
}

export { useUpdateScore }
