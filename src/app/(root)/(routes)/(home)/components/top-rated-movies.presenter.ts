import type { Movie } from '@/modules/movie/movie.entity'

export function selectTopRatedMovies(
  movies: Movie[],
  excludedIds: number[],
  limit = 6,
) {
  const excluded = new Set(excludedIds)
  const safeLimit = Math.max(0, Math.trunc(limit))

  return movies
    .filter(
      (movie) =>
        !excluded.has(movie.id) &&
        (movie.averageScore ?? 0) > 0 &&
        (movie.scoreCount ?? 0) > 0,
    )
    .slice(0, safeLimit)
}
