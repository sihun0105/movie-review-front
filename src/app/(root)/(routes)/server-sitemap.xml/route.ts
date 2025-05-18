import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import { getServerSideSitemap } from 'next-sitemap'

export async function GET(): Promise<ReturnType<typeof getServerSideSitemap>> {
  const movies = await fetch(AppBackEndApiEndpoint.getMovie()).then((res) =>
    res.json(),
  )
  const fields = movies.map((movie: any) => ({
    loc: `https://drunkenmovie.shop/movie/${movie.movieCd}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8,
  }))

  return getServerSideSitemap(fields)
}
