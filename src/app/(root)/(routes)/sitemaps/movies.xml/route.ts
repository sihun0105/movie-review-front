import { buildMovieFields } from '@/lib/sitemap/sitemap'
import { getMovieSitemapEntries } from '@/modules/movie/movie-sitemap-datasource'
import { getServerSideSitemap } from 'next-sitemap'

export const dynamic = 'force-dynamic'

export async function GET() {
  const movies = await getMovieSitemapEntries()

  return getServerSideSitemap(buildMovieFields(movies), {
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  })
}
