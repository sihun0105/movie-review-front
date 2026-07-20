import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const read = (relativePath: string) =>
  readFileSync(fileURLToPath(new URL(relativePath, import.meta.url)), 'utf8')

describe('article view count UI', () => {
  it('records a detail view and updates the displayed count', () => {
    const source = read('./[id]/components/article-view-count.tsx')

    expect(source).toContain('ArticleViewClientApiEndpoint.record')
    expect(source).toContain('setViewCount(result.viewCount)')
  })

  it('shows the count in both the list card and detail metadata', () => {
    const card = read('./components/article-card.tsx')
    const detail = read('./[id]/sections/article-data-section.tsx')

    expect(card).toContain('<Eye')
    expect(card).toContain('{article.viewCount}')
    expect(detail).toContain('<ArticleViewCount')
    expect(detail).toContain('initialCount={data.viewCount}')
  })
})
