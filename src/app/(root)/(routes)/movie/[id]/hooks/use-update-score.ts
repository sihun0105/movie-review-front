import { throttle } from 'lodash'
import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { useAppToast } from '@/hooks/use-app-toast'
import useSWR from 'swr'
import { useAuthenticationCheck } from '@/hooks/use-authentication-check'

interface UpdateScoreResult {
  id: string
  score: number
}

const updateScore = throttle(async (id: string, score: number) => {
  const url = AppClientApiEndpoint.updateScore(id)
  const res = await fetch(url, {
    body: JSON.stringify({ score }),
    method: 'POST',
  })
  if (!res.ok) {
    console.log(
      `[useUpdateScore] ${url}, error: ${res.status} [${res.statusText}]`,
    )
    throw new Error('An error occurred while updating the score.')
  }

  const result = await res.json()
  return result.data
}, 500)

const useUpdateScore = () => {
  const { showToast } = useAppToast()
  const { requireAuthentication } = useAuthenticationCheck()

  const { data, mutate, error, isValidating } =
    useSWR<UpdateScoreResult[]>('/scores')

  const handleUpdateScore = requireAuthentication(
    (id: string, score: number) => {
      const optimisticData = data?.map((item) =>
        item.id === id ? { ...item, score } : item,
      )

      mutate(
        async () => {
          await updateScore(id, score)
          showToast(`점수가 성공적으로 업데이트되었습니다.`)
          return optimisticData
        },
        {
          optimisticData,
          rollbackOnError: () => {
            showToast('점수 업데이트에 실패했습니다.')
            return true
          },
        },
      )
    },
  )

  return {
    data,
    handleUpdateScore,
    error,
    isValidating,
  }
}

export { useUpdateScore }
