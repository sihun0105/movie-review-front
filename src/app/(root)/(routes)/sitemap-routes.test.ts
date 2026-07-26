import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const readRoute = (routePath: string) =>
  fs.readFileSync(path.join(process.cwd(), routePath), 'utf8')

describe('sitemap route contracts', () => {
  it('serves sitemap.xml as an index with independently discovered pages', () => {
    const source = readRoute(
      'src/app/(root)/(routes)/sitemap.xml/route.ts',
    )

    expect(source).toContain('getServerSideSitemapIndex')
    expect(source).toContain('discoverSitemapPages')
    expect(source).toContain('Promise.all')
    expect(source).not.toContain('listArticles(1, 50)')
  })

  it('serves paginated article and match child sitemaps', () => {
    const articleSource = readRoute(
      'src/app/(root)/(routes)/sitemaps/articles/[page]/route.ts',
    )
    const matchSource = readRoute(
      'src/app/(root)/(routes)/sitemaps/matches/[page]/route.ts',
    )

    expect(articleSource).toMatch(
      /listArticles\(\s*page,\s*SITEMAP_PAGE_SIZE,\s*\)/,
    )
    expect(matchSource).toMatch(
      /getMatchPosts\(\s*page,\s*SITEMAP_PAGE_SIZE,\s*\)/,
    )
    expect(articleSource).toContain('parseSitemapPage')
    expect(matchSource).toContain('parseSitemapPage')
  })
})
