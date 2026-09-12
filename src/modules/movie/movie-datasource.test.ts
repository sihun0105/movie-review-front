import { afterEach, describe, expect, it, vi } from 'vitest'
vi.mock('@/config/movie-api-endpoint', () => ({
  MovieBackEndApiEndpoint: {
    getMovieDetail: (id: string) => `https://backend/movie/${id}`,
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
})
