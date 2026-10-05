import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({ getMovieCatalog: vi.fn() }))
vi.stubGlobal('React', React)

vi.mock('@/modules/movie/movie-repository', () => ({
  MovieRepository: class {
    getMovieCatalog = mocks.getMovieCatalog
  },
}))
vi.mock('@/lib/seo/public-discovery', () => ({
  movieCatalogHref: ({ page, query, genre }: any) => {
    const params = new URLSearchParams()
    if (query) params.set('query', query)
    if (genre) params.set('genre', genre)
    if (page > 1) params.set('page', String(page))
    return params.size ? `/movies?${params}` : '/movies'
  },
  movieCatalogPageNumber: (value?: string) => Number(value) || 1,
}))
vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND')
  },
}))
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))
vi.mock('./movie-catalog-card', () => ({ MovieCatalogCard: () => null }))

import MoviesPage, { generateMetadata } from './page'

describe('MoviesPage', () => {
  beforeEach(() => mocks.getMovieCatalog.mockReset())

  it('propagates catalog failures instead of serving a soft error page', async () => {
    mocks.getMovieCatalog.mockRejectedValueOnce(new Error('offline'))
    await expect(MoviesPage({ searchParams: {} })).rejects.toThrow('offline')
  })

  it('returns not found for a page beyond the catalog range', async () => {
    mocks.getMovieCatalog.mockResolvedValueOnce({
      movies: [],
      page: 99,
      pageSize: 24,
      total: 1,
      hasNext: false,
    })
    await expect(
      MoviesPage({ searchParams: { page: '99' } }),
    ).rejects.toThrow('NEXT_NOT_FOUND')
  })

  it('preserves the selected genre when submitting a title search', async () => {
    mocks.getMovieCatalog.mockResolvedValueOnce({
      movies: [],
      page: 1,
      pageSize: 24,
      total: 0,
      hasNext: false,
    })
    const html = renderToStaticMarkup(
      await MoviesPage({ searchParams: { genre: '액션' } }),
    )
    expect(html).toContain('type="hidden"')
    expect(html).toContain('name="genre"')
    expect(html).toContain('value="액션"')
  })

  it('publishes catalog-specific social metadata', () => {
    const metadata = generateMetadata({ searchParams: {} })
    expect(metadata.openGraph).toMatchObject({
      title: '영화 둘러보기 | 볼래',
      url: 'https://bollae.kr/movies',
    })
    expect(metadata.twitter).toMatchObject({
      title: '영화 둘러보기 | 볼래',
    })
  })
})
