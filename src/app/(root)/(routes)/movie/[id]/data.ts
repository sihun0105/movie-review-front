import { Reply } from '@/lib/type'
import { CommentRepository } from '@/modules/comment/comment-repository'
import { AverageMovieScore, Movie } from '@/modules/movie/movie.entity'
import { MovieRepository } from '@/modules/movie/movie-repository'

export const getMovieDetail = async (id: string): Promise<Movie> => {
  const repo = new MovieRepository()
  return repo.getMovieDetail(id)
}

export const getReviews = async (id: string): Promise<Reply[]> => {
  const repo = new CommentRepository()
  const result = await repo.getCommentList(id, 1)
  return result.comments
}

export const getScore = async (
  id: string,
): Promise<AverageMovieScore | null> => {
  try {
    const repo = new MovieRepository()
    return repo.getAverageScore(id)
  } catch (error) {
    console.error('Failed to get average score:', error)
    return null
  }
}

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
