import {
  buildArticleFields,
  parseSitemapPage,
  SITEMAP_PAGE_SIZE,
} from '@/lib/sitemap/sitemap'
import { ArticleRepository } from '@/modules/article/article-repository'
import { getServerSideSitemap } from 'next-sitemap'

interface RouteContext {
  params: { page: string }
}

export const dynamic = 'force-dynamic'

export async function GET(_request: Request, { params }: RouteContext) {
  const page = parseSitemapPage(params.page)
  if (!page) return new Response('Not Found', { status: 404 })

  const { articles } = await new ArticleRepository().listArticles(
    page,
    SITEMAP_PAGE_SIZE,
  )

  return getServerSideSitemap(buildArticleFields(articles), {
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  })
}

