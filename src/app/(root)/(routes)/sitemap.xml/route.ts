import { MovieRepository } from '@/modules/movie/movie-repository'
import { ArticleRepository } from '@/modules/article/article-repository'
import { MatchRepository } from '@/modules/match/match-repository'
import { ISitemapField } from 'next-sitemap'
import { getServerSideSitemap } from 'next-sitemap'

export const dynamic = 'force-dynamic'

export async function GET(): Promise<ReturnType<typeof getServerSideSitemap>> {
  const movies = await new MovieRepository().getMovie().catch(() => [])

  const { articles } = await new ArticleRepository()
    .listArticles(1, 50)
    .catch(() => ({ articles: [], hasNext: false }))

  const { matchPosts: matches } = await new MatchRepository()
    .getMatchPosts(1, 50)
    .catch(() => ({ matchPosts: [], hasNext: false }))

  const fields: ISitemapField[] = []

  // 영화 상세 페이지
  if (movies && Array.isArray(movies)) {
    fields.push(
      ...movies.map((movie) => ({
        loc: `https://drunkenmovie.shop/movie/${movie.id}`,
        lastmod: movie.updatedAt?.toISOString?.() || new Date().toISOString(),
        changefreq: 'daily' as const,
        priority: 0.8,
      })),
    )
  }

  // 게시글 상세 페이지
  if (articles && Array.isArray(articles)) {
    fields.push(
      ...articles.map((article) => ({
        loc: `https://drunkenmovie.shop/articles/${article.id}`,
        lastmod: article.updatedAt
          ? new Date(article.updatedAt).toISOString()
          : new Date().toISOString(),
        changefreq: 'daily' as const,
        priority: 0.6,
      })),
    )
  }

  // 매치 상세 페이지
  if (matches && Array.isArray(matches)) {
    fields.push(
      ...matches.map((match) => ({
        loc: `https://drunkenmovie.shop/match/${match.id}`,
        lastmod: match.updatedAt
          ? new Date(match.updatedAt).toISOString()
          : new Date().toISOString(),
        changefreq: 'weekly' as const,
        priority: 0.5,
      })),
    )
  }

  // 주요 루트 경로
  fields.push(
    {
      loc: 'https://drunkenmovie.shop/',
      lastmod: new Date().toISOString(),
      changefreq: 'daily' as const,
      priority: 1.0,
    },
    {
      loc: 'https://drunkenmovie.shop/articles',
      lastmod: new Date().toISOString(),
      changefreq: 'daily' as const,
      priority: 0.9,
    },
    {
      loc: 'https://drunkenmovie.shop/account',
      lastmod: new Date().toISOString(),
      changefreq: 'daily' as const,
      priority: 0.5,
    },
    {
      loc: 'https://drunkenmovie.shop/match',
      lastmod: new Date().toISOString(),
      changefreq: 'daily' as const,
      priority: 0.7,
    },
  )

  return getServerSideSitemap(fields)
}
