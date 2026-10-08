import type { Movie } from '@/modules/movie/movie.entity'
import { describe, expect, it } from 'vitest'
import { selectTopRatedMovies } from './top-rated-movies.presenter'

const movie = (id: number, scored = true) =>
  ({
    id,
    averageScore: scored ? 4.5 : 0,
    scoreCount: scored ? 3 : 0,
  }) as Movie

describe('selectTopRatedMovies', () => {
  it('preserves backend order while excluding box office movies', () => {
    const movies = [1, 2, 3, 4, 5, 6, 7, 8].map((id) => movie(id))

    expect(selectTopRatedMovies(movies, [2, 4], 6).map(({ id }) => id)).toEqual(
      [1, 3, 5, 6, 7, 8],
    )
  })

  it('omits invalid score entries and respects the requested limit', () => {
    const movies = [movie(1), movie(2, false), movie(3), movie(4)]

    expect(selectTopRatedMovies(movies, [], 2).map(({ id }) => id)).toEqual([
      1, 3,
    ])
  })

  it('returns an empty list for empty or fully excluded input', () => {
    expect(selectTopRatedMovies([], [], 6)).toEqual([])
    expect(selectTopRatedMovies([movie(1)], [1], 6)).toEqual([])
  })
})
