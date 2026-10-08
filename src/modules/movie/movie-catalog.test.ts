import { describe, expect, it, vi } from 'vitest'

vi.mock('@/config/movie-api-endpoint', () => ({
  MovieBackEndApiEndpoint: {},
}))

import { MovieRepository } from './movie-repository'

describe('movie catalog mapping', () => {
  it('maps backend movie data and pagination metadata', async () => {
    const datasource = {
      getMovieCatalog: vi.fn().mockResolvedValue({
        movies: [
          {
            movieCd: 20256308,
            title: '인턴',
            audience: 10,
            rank: 0,
            isRanked: false,
            createdAt: '2026-01-01',
            updatedAt: '2026-01-02',
            openDt: '2026-02-01',
            poster: '',
            genre: '드라마',
            director: '감독',
            ratting: '12세이상관람가',
            actors: [],
          },
        ],
        page: 1,
        pageSize: 24,
        total: 1,
        hasNext: false,
      }),
    }
    const repository = new MovieRepository(undefined, datasource as any)

    const result = await repository.getMovieCatalog('', '', 1, 24)

    expect(result.movies[0]).toMatchObject({ id: 20256308, title: '인턴' })
    expect(result).toMatchObject({ total: 1, hasNext: false })
  })

  it('treats an omitted protobuf movie list as empty', async () => {
    const datasource = {
      getMovieCatalog: vi.fn().mockResolvedValue({
        page: 999999,
        pageSize: 24,
        total: 1,
        hasNext: false,
      }),
    }
    const repository = new MovieRepository(undefined, datasource as any)

    const result = await repository.getMovieCatalog('', '', 999999, 24)

    expect(result.movies).toEqual([])
  })

  it('treats an omitted top-rated protobuf list as empty', async () => {
    const datasource = { getTopRatedMovies: vi.fn().mockResolvedValue({}) }
    const repository = new MovieRepository(undefined, datasource as any)

    await expect(repository.getTopRatedMovies()).resolves.toEqual([])
  })
})
