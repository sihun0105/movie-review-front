import { describe, expect, it } from 'vitest'
import { articlePreview, isRecentArticle } from './article-card-presenter'

describe('article card presenter', () => {
  it('removes media and markdown syntax from the preview', () => {
    expect(
      articlePreview(
        '## 영화 후기\n![장면](https://cdn.example/scene.gif) **정말** 좋았어요. [더 보기](https://example.com)',
      ),
    ).toBe('영화 후기 정말 좋았어요. 더 보기')
  })

  it('marks only articles from the last 48 hours as recent', () => {
    const now = new Date('2026-10-05T12:00:00+09:00')
    expect(isRecentArticle('2026-10-04T12:01:00+09:00', now)).toBe(true)
    expect(isRecentArticle('2026-10-03T11:59:00+09:00', now)).toBe(false)
  })
})
