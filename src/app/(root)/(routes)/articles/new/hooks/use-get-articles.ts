import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import useSWR from 'swr'

const getKey = (id: string) => {
  return AppClientApiEndpoint.getArticle(+id)
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('게시글을 불러오지 못했습니다.')
  const result = await res.json()
  return result.data
}

export const useGetArticle = (articleId: string) => {
  const { data, ...res } = useSWR<any>(getKey(articleId), fetcher, {})

  return {
    data,
    ...res,
  }
}
