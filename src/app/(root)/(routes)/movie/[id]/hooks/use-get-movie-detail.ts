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

const getKey = (movieCd: string) => {
  return AppClientApiEndpoint.getMovieDetail(movieCd)
}

export const useGetMovieDetail = (movieCd: string) => {
  const { data: movieDetailData, ...res } = useSWR<any>(
    getKey(movieCd),
    fetcher,
    {},
  )
  return {
    data: movieDetailData,
    ...res,
  }
}
