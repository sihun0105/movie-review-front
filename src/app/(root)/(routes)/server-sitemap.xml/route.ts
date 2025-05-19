import { MovieRepository } from '@/modules/movie/movie-repository'
import { ISitemapField } from 'next-sitemap'
import { getServerSideSitemap } from 'next-sitemap'

export async function GET(): Promise<ReturnType<typeof getServerSideSitemap>> {
  const repo = new MovieRepository()
  const movies = await repo.getMovie()

  const fields: ISitemapField[] = movies.map((movie) => ({
    loc: `https://drunkenmovie.shop/movie/${movie.id}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8,
  }))
  fields.push({
    loc: 'https://drunkenmovie.shop',
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 1.0,
  })

  return getServerSideSitemap(fields)
}
