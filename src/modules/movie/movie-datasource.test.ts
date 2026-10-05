import { afterEach, describe, expect, it, vi } from 'vitest'
vi.mock('@/config/movie-api-endpoint', () => ({
  MovieBackEndApiEndpoint: {
    getMovieDetail: (id: string) => `https://backend/movie/${id}`,
    getMovieCatalog: (
      query: string,
      genre: string,
      page: number,
      pageSize: number,
    ) =>
      `https://backend/movie/catalog?query=${query}&genre=${genre}&page=${page}&pageSize=${pageSize}`,
  },
}))
import { MovieDatasource } from './movie-datasource'
afterEach(() => vi.unstubAllGlobals())
describe('movie HTTP error contract', () => {
  it.each([404, 503])(
    'preserves HTTP %s for the page boundary',
    async (status) => {
      vi.stubGlobal('fetch', async () => new Response('{}', { status }))
      await expect(
        new MovieDatasource().getMovieDetail('99999999'),
      ).rejects.toMatchObject({ status })
    },
  )

  it('caches the public movie catalog briefly', async () => {
    const fetch = vi.fn(
      async () =>
        new Response(
          '{"movies":[],"page":1,"pageSize":24,"total":0,"hasNext":false}',
        ),
    )
    vi.stubGlobal('fetch', fetch)

    await new MovieDatasource().getMovieCatalog('', '', 1, 24)

    expect(fetch).toHaveBeenCalledWith(
      'https://backend/movie/catalog?query=&genre=&page=1&pageSize=24',
      expect.objectContaining({ next: { revalidate: 300 } }),
    )
  })
})
