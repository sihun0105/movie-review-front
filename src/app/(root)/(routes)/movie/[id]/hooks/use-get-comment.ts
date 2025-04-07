import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { useParams } from 'next/navigation'
import useSWRInfinite from 'swr/infinite'

const getKey =
  (movieId: number) => (pageIndex: number, previousPageData: any) => {
    if (previousPageData && previousPageData.replys?.length === 0) {
      return null
    }
    return AppClientApiEndpoint.getComments(movieId, pageIndex)
  }

const fetcher = async (url: string): Promise<any> => {
  const res = await fetch(url)
  if (!res.ok) {
    throw Error('Error fetching data')
  }
  const result = await res.json()
  return result.data
}

const useGetComments = () => {
  const searchParams: any = useParams()
  const movieId = searchParams.id
  if (!movieId) {
    throw new Error('movieId is required')
  }

  const {
    data: movieData,
    setSize,
    error,
    isLoading,
    isValidating,
  } = useSWRInfinite<any>(getKey(+movieId), fetcher)
  const next = () => {
    setSize((size) => size + 1)
  }
  const isEmpty = movieData?.[0]?.replys?.length === 0
  const hasMore =
    !isEmpty && movieData?.[movieData.length - 1]?.replys?.length > 0

  return {
    data: movieData,
    next,
    error,
    isLoading,
    isValidating,
    hasMore,
  }
}

export { useGetComments }
