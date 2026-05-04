import { MovieRepository } from '@/modules/movie'
import { MetadataRoute } from 'next'

const BASE_URL = 'https://drunkenmovie.shop'

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date() },
  { url: `${BASE_URL}/match`, lastModified: new Date() },
  { url: `${BASE_URL}/articles`, lastModified: new Date() },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const repo = new MovieRepository()
    const movies = await repo.getMovie()

    const movieRoutes: MetadataRoute.Sitemap = movies.map((movie) => ({
      url: `${BASE_URL}/movie/${movie.id}`,
      lastModified: movie.updatedAt ?? new Date(),
    }))

    return [...STATIC_ROUTES, ...movieRoutes]
  } catch {
    return STATIC_ROUTES
  }
}
