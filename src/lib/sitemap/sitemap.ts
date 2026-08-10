import type { Article, MatchPost } from '@/lib/type'
import type { MovieSitemapEntry } from '@/modules/movie/movie-sitemap-datasource'
import type { ISitemapField } from 'next-sitemap'

export const SITE_URL = 'https://bollae.kr'
export const SITEMAP_PAGE_SIZE = 100

interface SitemapPageResult {
  itemCount: number
  hasNext: boolean
}

type SitemapPageFetcher = (
  _page: number,
  _pageSize: number,
) => Promise<SitemapPageResult>

export async function discoverSitemapPages(
  fetchPage: SitemapPageFetcher,
): Promise<number[]> {
  const pages: number[] = []
  let page = 1

  while (true) {
    const result = await fetchPage(page, SITEMAP_PAGE_SIZE)
    if (result.itemCount < 1) break

    pages.push(page)
    if (!result.hasNext) break
    page += 1
  }

  return pages
}

export function buildIndexUrls(
  articlePages: number[],
  matchPages: number[],
): string[] {
  return [
    `${SITE_URL}/sitemaps/static.xml`,
    `${SITE_URL}/sitemaps/movies.xml`,
    ...articlePages.map((page) => `${SITE_URL}/sitemaps/articles/${page}`),
    ...matchPages.map((page) => `${SITE_URL}/sitemaps/matches/${page}`),
  ]
}

export function buildArticleFields(articles: Article[]): ISitemapField[] {
  return articles.map((article) => ({
    loc: `${SITE_URL}/articles/${article.id}`,
    lastmod: article.updatedAt ?? article.createdAt,
    changefreq: 'daily',
    priority: 0.6,
  }))
}

export function buildMatchFields(matches: MatchPost[]): ISitemapField[] {
  return matches.map((match) => ({
    loc: `${SITE_URL}/match/${match.id}`,
    lastmod: match.updatedAt ?? match.createdAt,
    changefreq: 'weekly',
    priority: 0.5,
  }))
}

export function buildMovieFields(movies: MovieSitemapEntry[]): ISitemapField[] {
  return movies.map((movie) => ({
    loc: `${SITE_URL}/movie/${movie.movieCd}`,
    lastmod: movie.updatedAt,
    changefreq: 'daily',
    priority: 0.8,
  }))
}

export function buildStaticFields(): ISitemapField[] {
  return [
    {
      loc: `${SITE_URL}/`,
      changefreq: 'daily',
      priority: 1,
    },
    {
      loc: `${SITE_URL}/articles`,
      changefreq: 'daily',
      priority: 0.9,
    },
    {
      loc: `${SITE_URL}/match`,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      loc: `${SITE_URL}/chat/public`,
      changefreq: 'daily',
      priority: 0.6,
    },
  ]
}

export function parseSitemapPage(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null

  const page = Number(value)
  return Number.isSafeInteger(page) ? page : null
}
