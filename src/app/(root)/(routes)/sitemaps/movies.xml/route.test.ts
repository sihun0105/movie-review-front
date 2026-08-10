import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getMovieSitemapEntries } from '@/modules/movie/movie-sitemap-datasource'
import { GET } from './route'

vi.mock('@/lib/sitemap/sitemap', () => ({
  buildMovieFields: vi.fn(() => []),
}))
vi.mock('@/modules/movie/movie-sitemap-datasource', () => ({
  getMovieSitemapEntries: vi.fn(),
}))
vi.mock('next-sitemap', () => ({
  getServerSideSitemap: vi.fn(),
}))

describe('movie sitemap route', () => {
  beforeEach(() => vi.clearAllMocks())

  it('propagates backend failures instead of caching an empty sitemap', async () => {
    vi.mocked(getMovieSitemapEntries).mockRejectedValue(
      new Error('backend unavailable'),
    )

    await expect(GET()).rejects.toThrow('backend unavailable')
  })
})
