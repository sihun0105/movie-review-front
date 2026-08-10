import { MovieBackEndApiEndpoint } from '@/config/movie-api-endpoint'

export interface MovieSitemapEntry {
  movieCd: number
  updatedAt: string
}

interface MovieSitemapResponse {
  movies?: MovieSitemapEntry[]
}

export async function getMovieSitemapEntries(): Promise<MovieSitemapEntry[]> {
  const response = await fetch(
    MovieBackEndApiEndpoint.getMovieSitemapEntries(),
    { cache: 'no-cache' },
  )
  if (!response.ok) {
    throw new Error('영화 사이트맵 데이터를 받아 올 수 없습니다.')
  }

  const data = (await response.json()) as MovieSitemapResponse
  return Array.isArray(data.movies) ? data.movies : []
}
