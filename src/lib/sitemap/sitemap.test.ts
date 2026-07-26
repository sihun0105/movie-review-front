import { describe, expect, it, vi } from 'vitest'
import {
  buildArticleFields,
  buildIndexUrls,
  buildMatchFields,
  buildMovieFields,
  buildStaticFields,
  discoverSitemapPages,
  parseSitemapPage,
  SITEMAP_PAGE_SIZE,
} from './sitemap'

describe('sitemap helpers', () => {
  it('discovers every populated page until hasNext becomes false', async () => {
    const fetchPage = vi
      .fn()
      .mockResolvedValueOnce({ itemCount: 100, hasNext: true })
      .mockResolvedValueOnce({ itemCount: 100, hasNext: true })
      .mockResolvedValueOnce({ itemCount: 5, hasNext: false })

    await expect(discoverSitemapPages(fetchPage)).resolves.toEqual([1, 2, 3])
    expect(fetchPage).toHaveBeenNthCalledWith(1, 1, SITEMAP_PAGE_SIZE)
    expect(fetchPage).toHaveBeenNthCalledWith(3, 3, SITEMAP_PAGE_SIZE)
  })

  it('omits an empty source and stops inconsistent empty pagination', async () => {
    await expect(
      discoverSitemapPages(async () => ({ itemCount: 0, hasNext: true })),
    ).resolves.toEqual([])
  })

  it('builds the sitemap index from discovered content pages', () => {
    expect(buildIndexUrls([1, 2], [1])).toEqual([
      'https://bollae.kr/sitemaps/static.xml',
      'https://bollae.kr/sitemaps/movies.xml',
      'https://bollae.kr/sitemaps/articles/1',
      'https://bollae.kr/sitemaps/articles/2',
      'https://bollae.kr/sitemaps/matches/1',
    ])
  })

  it('maps public content to canonical detail URLs and update dates', () => {
    expect(
      buildArticleFields([
        {
          id: '51',
          createdAt: '2026-07-01T00:00:00.000Z',
          updatedAt: '2026-07-02T00:00:00.000Z',
        },
      ] as any),
    ).toEqual([
      {
        loc: 'https://bollae.kr/articles/51',
        lastmod: '2026-07-02T00:00:00.000Z',
        changefreq: 'daily',
        priority: 0.6,
      },
    ])

    expect(
      buildMatchFields([
        {
          id: 'match-1',
          createdAt: '2026-07-03T00:00:00.000Z',
        },
      ] as any),
    ).toEqual([
      {
        loc: 'https://bollae.kr/match/match-1',
        lastmod: '2026-07-03T00:00:00.000Z',
        changefreq: 'weekly',
        priority: 0.5,
      },
    ])

    expect(
      buildMovieFields([
        {
          id: 20259946,
          updatedAt: new Date('2026-07-04T00:00:00.000Z'),
        },
      ] as any),
    ).toEqual([
      {
        loc: 'https://bollae.kr/movie/20259946',
        lastmod: '2026-07-04T00:00:00.000Z',
        changefreq: 'daily',
        priority: 0.8,
      },
    ])
  })

  it('includes only public static routes and validates page parameters', () => {
    expect(buildStaticFields().map((field) => field.loc)).toEqual([
      'https://bollae.kr/',
      'https://bollae.kr/articles',
      'https://bollae.kr/match',
      'https://bollae.kr/chat/public',
    ])
    expect(parseSitemapPage('2')).toBe(2)
    expect(parseSitemapPage('0')).toBeNull()
    expect(parseSitemapPage('1.5')).toBeNull()
    expect(parseSitemapPage('abc')).toBeNull()
  })
})
