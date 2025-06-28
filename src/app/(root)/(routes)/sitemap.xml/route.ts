import { MovieRepository } from '@/modules/movie/movie-repository'
import { ArticleRepository } from '@/modules/article/article-repository'
import { ISitemapField } from 'next-sitemap'
import { getServerSideSitemap } from 'next-sitemap'

export async function GET(): Promise<ReturnType<typeof getServerSideSitemap>> {
  // 영화 데이터
  const movieRepo = new MovieRepository()
  const movies = await movieRepo.getMovie()

  // 게시글 데이터 (최대 50개만, 필요시 pageSize 조정)
  const articleRepo = new ArticleRepository()
  const { articles } = await articleRepo.listArticles(1, 50)

  const fields: ISitemapField[] = []

  // 영화 상세 페이지
  if (movies && Array.isArray(movies)) {
    fields.push(
      ...movies.map((movie) => ({
        loc: `https://drunkenmovie.shop/movie/${movie.id}`,
        lastmod: movie.updatedAt?.toISOString?.() || new Date().toISOString(),
        changefreq: 'weekly' as const,
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
        changefreq: 'weekly' as const,
        priority: 0.6,
      })),
    )
  }

  // 주요 루트 경로
  fields.push(
    {
      loc: 'https://drunkenmovie.shop/',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly' as const,
      priority: 1.0,
    },
    {
      loc: 'https://drunkenmovie.shop/articles',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly' as const,
      priority: 0.7,
    },
  )

  return getServerSideSitemap(fields)
}
