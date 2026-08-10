import { describe, expect, it, vi } from 'vitest'

vi.mock('./movie-datasource', () => ({
  MovieDatasource: class {},
}))

import { MovieRepository } from './movie-repository'

describe('movie cast mapping', () => {
  it('maps actor portraits returned by the detail API', async () => {
    const datasource = {
      getMovieDetail: async () => ({
        movieCd: 20250654,
        audience: 0,
        title: '오디세이',
        createdAt: '2026-08-10',
        updatedAt: '2026-08-10',
        poster: '/poster.jpg',
        rank: 0,
        isRanked: false,
        rankInten: '0',
        plot: '',
        rankOldAndNew: '',
        openDt: '2026-01-01',
        genre: '모험',
        director: '크리스토퍼 놀란',
        ratting: '',
        vods: [],
        actors: [
          {
            id: 6193,
            name: '맷 데이먼',
            character: '오디세우스',
            profileUrl: 'https://image.tmdb.org/t/p/w342/matt.jpg',
            sortOrder: 0,
          },
        ],
      }),
    }
    const repository = new MovieRepository(undefined, datasource as any)

    const movie = await repository.getMovieDetail('20250654')

    expect(movie.actors).toEqual([
      expect.objectContaining({ name: '맷 데이먼', sortOrder: 0 }),
    ])
  })
})
