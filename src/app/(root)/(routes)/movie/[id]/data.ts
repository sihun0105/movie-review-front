import { RepliesResponse } from '@/lib/type'
import { cache } from 'react'
import { CommentRepository } from '@/modules/comment/comment-repository'
import { AverageMovieScore, Movie } from '@/modules/movie/movie.entity'
import { MovieRepository } from '@/modules/movie/movie-repository'

export const getMovieDetail = cache(async (id: string): Promise<Movie> => {
  const repo = new MovieRepository()
  return repo.getMovieDetail(id)
})

export const getCommentPage = cache(
  async (id: string): Promise<RepliesResponse | undefined> => {
    try {
      return await new CommentRepository().getCommentList(id, 0)
    } catch {
      return undefined
    }
  },
)

export const getReviews = async (id: string) =>
  (await getCommentPage(id))?.comments ?? []

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
