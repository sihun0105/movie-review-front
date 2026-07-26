import { buildStaticFields } from '@/lib/sitemap/sitemap'
import { getServerSideSitemap } from 'next-sitemap'

export const dynamic = 'force-dynamic'

export async function GET() {
  return getServerSideSitemap(buildStaticFields(), {
    'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
  })
}
