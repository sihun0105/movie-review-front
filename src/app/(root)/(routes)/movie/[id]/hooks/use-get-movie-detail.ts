import { MovieClientApiEndpoint } from '@/config/movie-api-endpoint'
import useSWR from 'swr'
import type { Movie } from '@/modules/movie/movie.entity'

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
  return MovieClientApiEndpoint.getMovieDetail(movieCd)
}

export const useGetMovieDetail = (movieCd: string, initialMovie?: Movie) => {
  const { data: movieDetailData, ...res } = useSWR<Movie>(
    getKey(movieCd),
    fetcher,
    { fallbackData: initialMovie },
  )
  return {
    data: movieDetailData,
    ...res,
  }
}
