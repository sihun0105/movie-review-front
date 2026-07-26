import { ArticleRepository } from '@/modules/article/article-repository'
import { MatchPostRepository } from '@/modules/match/match-post-repository'
import {
  buildIndexUrls,
  discoverSitemapPages,
} from '@/lib/sitemap/sitemap'
import { getServerSideSitemapIndex } from 'next-sitemap'

export const dynamic = 'force-dynamic'

const cacheHeaders = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
}

export async function GET() {
  const articleRepository = new ArticleRepository()
  const matchRepository = new MatchPostRepository()

  const [articlePages, matchPages] = await Promise.all([
    discoverSitemapPages(async (page, pageSize) => {
      const result = await articleRepository.listArticles(page, pageSize)
      return { itemCount: result.articles.length, hasNext: result.hasNext }
    }).catch(() => []),
    discoverSitemapPages(async (page, pageSize) => {
      const result = await matchRepository.getMatchPosts(page, pageSize)
      return { itemCount: result.matchPosts.length, hasNext: result.hasNext }
    }).catch(() => []),
  ])

  return getServerSideSitemapIndex(
    buildIndexUrls(articlePages, matchPages),
    cacheHeaders,
  )
}
