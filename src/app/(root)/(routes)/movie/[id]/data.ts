import { RepliesResponse } from '@/lib/type'
import { cache } from 'react'
import { CommentRepository } from '@/modules/comment/comment-repository'
import { AverageMovieScore, Movie } from '@/modules/movie/movie.entity'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { HttpResponseError } from '@/lib/http-response-error'
import { notFound } from 'next/navigation'

export const getMovieDetail = cache(async (id: string): Promise<Movie> => {
  const repo = new MovieRepository()
  if (!/^\d{8}$/.test(id)) notFound()
  try {
    return await repo.getMovieDetail(id)
  } catch (error) {
    if (error instanceof HttpResponseError && error.status === 404) notFound()
    throw error
  }
})

export const getCommentPage = cache(
  async (id: string): Promise<RepliesResponse | undefined> => {
    try {
      return await new CommentRepository().getCommentList(id, 1)
    } catch {
      return undefined
    }
  },
)

export const getReviews = async (id: string) =>
  (await getCommentPage(id))?.comments ?? []

export async function getFilmography(
  movie: Movie,
): Promise<Movie[] | undefined> {
  const director = movie.director
    ?.split(/[,/·]/)
    .map((name) => name.trim())
    .find(Boolean)
  if (!director) return []
  try {
    return await new MovieRepository().getMoviesByDirector(
      director,
      movie.id,
      12,
    )
  } catch {
    return undefined
  }
}

export const getScore = cache(
  async (id: string): Promise<AverageMovieScore | null> => {
    try {
      const repo = new MovieRepository()
      return await repo.getAverageScore(id)
    } catch (error) {
      console.error('Failed to get average score:', error)
      return null
    }
  },
)

export function hasValidScore(
  score: AverageMovieScore | null,
): score is AverageMovieScore & { averageScore: number; scoreCount: number } {
  return !!(
    score &&
    typeof score.averageScore === 'number' &&
    !isNaN(score.averageScore) &&
    score.averageScore > 0 &&
    score.averageScore <= 5 &&
    score.scoreCount > 0
  )
}
