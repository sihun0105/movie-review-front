import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { useParams } from 'next/navigation'
import useSWRInfinite from 'swr/infinite'
import { mutate } from 'swr'
import { RepliesResponse } from '@/lib/type'

const getKey =
  (movieId: number) =>
  (pageIndex: number, previousPageData: RepliesResponse | null) => {
    if (previousPageData && !previousPageData.hasNext) return null
    return AppClientApiEndpoint.getComments(movieId, pageIndex)
  }

const fetcher = async (url: string): Promise<RepliesResponse> => {
  const res = await fetch(url, {
    method: 'GET',
  })
  if (!res.ok) {
    throw Error('Error fetching data')
  }
  const result = await res.json()
  return result.data
}

const useGetComments = () => {
  const searchParams = useParams()
  const movieId = searchParams?.id

  if (!movieId) {
    throw new Error('movieId is required')
  }

  const { data, setSize, error, isLoading, isValidating } =
    useSWRInfinite<RepliesResponse>(getKey(+movieId), fetcher)

  const next = () => setSize((size) => size + 1)

  const hasMore = data?.[data.length - 1]?.hasNext ?? false

  return {
    data,
    next,
    error,
    isLoading,
    isValidating,
    hasMore,
    mutate: () => mutate(getKey(+movieId)(0, null)),
  }
}

export { useGetComments }
