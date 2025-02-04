import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const { data: result } = await response.json()
  if (!response.ok) {
    throw new Error(result.message)
  }
  return result
}

const getKey = (nowDate: string) => {
  return AppClientApiEndpoint.getChatHistory(nowDate)
}

export const useGetChatHistory = (nowDate: string) => {
  const { data: chatData, ...res } = useSWR<any[]>(getKey(nowDate), fetcher, {})
  return {
    data: chatData,
    ...res,
  }
}
