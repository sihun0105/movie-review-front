'use client'

import { MovieClientApiEndpoint } from '@/config/movie-api-endpoint'
import { Movie } from '@/modules/movie/movie.entity'
import useSWR from 'swr'

const fetcher = async (url: string): Promise<Movie[]> => {
  const response = await fetch(url)
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error || '감독 필모그래피를 불러오지 못했습니다.')
  }
  return result.movies ?? []
}

const pickFirstDirector = (director?: string) => {
  return (
    director
      ?.split(/[,/·]/)
      .map((name) => name.trim())
      .filter(Boolean)[0] ?? ''
  )
}

export const useDirectorFilmography = (movie?: Movie) => {
  const director = pickFirstDirector(movie?.director)
  const key =
    movie && director
      ? MovieClientApiEndpoint.getMoviesByDirector(director, movie.id, 12)
      : null

  const { data, ...state } = useSWR<Movie[]>(key, fetcher)

  return {
    director,
    movies: data ?? [],
    ...state,
  }
}
