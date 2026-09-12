import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GET as index } from '../sitemap.xml/route'
import { GET as matches } from './matches/[page]/route'

const { listArticles, getMatchPosts } = vi.hoisted(() => ({
  listArticles: vi.fn(),
  getMatchPosts: vi.fn(),
}))
vi.mock('@/modules/article/article-repository', () => ({
  ArticleRepository: class {
    listArticles = listArticles
  },
}))
vi.mock('../../../../modules/match/match-post-datasource', () => ({
  MatchPostDataSource: class {
    getMatchPosts = getMatchPosts
  },
}))
vi.mock(
  '@/modules/match/match-post-repository',
  async () => import('../../../../modules/match/match-post-repository'),
)
vi.mock(
  '@/lib/sitemap/sitemap',
  async () => import('../../../../lib/sitemap/sitemap'),
)

describe('sitemap reliability', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    listArticles.mockResolvedValue({ articles: [], hasNext: false })
    getMatchPosts.mockResolvedValue({ hasNext: false })
  })

  it('serves omitted empty match lists as valid empty XML', async () => {
    const response = await matches(new Request('https://bollae.kr'), {
      params: { page: '1' },
    })
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('xml')
    const xml = await response.text()
    expect(xml).toContain('<urlset')
    expect(xml).not.toContain('<url>')
  })

  it('serves a successful empty index without match child links', async () => {
    const response = await index()
    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toContain('s-maxage=3600')
    const xml = await response.text()
    expect(xml).toContain('/sitemaps/movies.xml')
    expect(xml).not.toContain('/sitemaps/matches/1')
  })

  it.each(['articles', 'matches'])(
    'returns an uncacheable 503 on %s failure',
    async (source) => {
      const fetcher = source === 'articles' ? listArticles : getMatchPosts
      fetcher.mockRejectedValue(new Error('upstream unavailable'))
      const response = await index()
      expect(response.status).toBe(503)
      expect(response.headers.get('cache-control')).toBe('no-store')
      expect(await response.text()).not.toContain('<sitemapindex')
    },
  )

  it('does not publish a partial index when later discovery fails', async () => {
    listArticles
      .mockResolvedValueOnce({ articles: [{ id: '1' }], hasNext: true })
      .mockRejectedValueOnce(new Error('page two unavailable'))
    const response = await index()
    expect(response.status).toBe(503)
    expect(response.headers.get('cache-control')).toBe('no-store')
  })

  it('does not normalize malformed match lists to successful empty indexes', async () => {
    getMatchPosts.mockResolvedValue({ matchPosts: null, hasNext: false })
    expect((await index()).status).toBe(503)
  })
})
