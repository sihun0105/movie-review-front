import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import useSWRMutate from 'swr/mutation'

const fetcher = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      nowDate: string
    }
  },
) => {
  const res = await fetch(url, {
    method: 'GET',
  })
  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.message)
  }

  return result
}

export const useGetChatHistory = (nowDate: string) => {
  const { data, trigger, isMutating, error } = useSWRMutate<any>(
    AppClientApiEndpoint.getChatHistory(nowDate),
    fetcher,
  )

  const getChatHistory = (
    arg: {
      nowDate: string
    },
    {
      onSuccess,
      onError,
    }: {
      onSuccess: () => void
      onError: () => void
    },
  ) => {
    trigger(null, {
      onSuccess,
      onError,
    })
  }

  return {
    data,
    getChatHistory,
    isGettingChat: isMutating,
    getChatHistoryError: error,
  }
}
