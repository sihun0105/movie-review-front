import { throttle } from 'lodash'
import useSWR from 'swr'
import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { useAppToast } from '@/hooks/use-app-toast'
import { useAuthenticationCheck } from '@/hooks/use-authentication-check'
import { LikeState } from '@/lib/type'

interface UpdateLikeResult {
  id: number
  likes: number
  dislikes: number
}

const getKey = (id: number) => {
  return AppClientApiEndpoint.getArticleLikes(id)
}

const fetcher = async (url: string): Promise<UpdateLikeResult> => {
  const res = await fetch(url)
  if (!res.ok) {
    console.log(
      `[useUpdateLike] ${url}, error: ${res.status} [${res.statusText}]`,
    )
    throw new Error('Failed to fetch like data.')
  }
  const result = await res.json()
  return result.data
}

const throttledUpdateLike = throttle(async (id: number, state: LikeState) => {
  const url = AppClientApiEndpoint.updateArticleLike(id, state)
  const res = await fetch(url, { method: 'POST' })

  if (!res.ok) {
    console.log(
      `[useUpdateLike] ${url}, error: ${res.status} [${res.statusText}]`,
    )
    throw new Error('Failed to update like data.')
  }

  const result = await res.json()
  return result.data
}, 500)

const useUpdateLike = (id: number) => {
  const { showToast } = useAppToast()
  const { requireAuthentication } = useAuthenticationCheck()

  const { data, mutate, error, isValidating } = useSWR<UpdateLikeResult>(
    getKey(id),
    fetcher,
  )

  const handleUpdateLike = requireAuthentication((state: LikeState) => {
    // state가 'like' 또는 'dislike'로 전달됨
    // const optimisticData = {
    //   ...(data || { id, likes: 0, dislikes: 0 }),
    //   likes: state === 'like' ? (data?.likes || 0) + 1 : data?.likes || 0,
    //   dislikes:
    //     state === 'dislike' ? (data?.dislikes || 0) + 1 : data?.dislikes || 0,
    // }

    mutate(
      async () => {
        await throttledUpdateLike(id, state)
        showToast('좋아요/싫어요가 성공적으로 업데이트되었습니다.')
        // return optimisticData
        return data // 서버에서 받아온 값만 사용
      },
      {
        // optimisticData,
        revalidate: true, // 서버 값으로 갱신
        rollbackOnError: () => {
          showToast('좋아요/싫어요 업데이트에 실패했습니다.')
          return true
        },
      },
    )
  })

  return {
    data,
    update: handleUpdateLike,
    error,
    isValidating,
  }
}

export { useUpdateLike }
