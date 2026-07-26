import { buildMovieFields } from '@/lib/sitemap/sitemap'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { getServerSideSitemap } from 'next-sitemap'

export const dynamic = 'force-dynamic'

export async function GET() {
  const movies = await new MovieRepository().getMovie().catch(() => [])

  return getServerSideSitemap(buildMovieFields(movies), {
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  })
}

