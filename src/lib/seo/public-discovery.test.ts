import { describe, expect, it } from 'vitest'
import {
  articlePageHref,
  articlePageNumber,
  sitemapModifiedDate,
} from './public-discovery'

describe('public discovery URLs and dates', () => {
  it('uses stable, distinct canonical URLs for article pages', () => {
    expect(articlePageHref(articlePageNumber())).toBe('/articles')
    expect(articlePageHref(articlePageNumber('2'))).toBe('/articles?page=2')
    for (const invalid of ['-1', '0', '2junk', '1.5', '99999999999999999999']) {
      expect(articlePageNumber(invalid)).toBe(1)
    }
  })

  it('omits unknown modification dates without inventing freshness', () => {
    expect(sitemapModifiedDate('2000-01-01T00:00:00.000Z')).toBeUndefined()
    expect(sitemapModifiedDate('invalid')).toBeUndefined()
    expect(sitemapModifiedDate()).toBeUndefined()
    expect(sitemapModifiedDate('2026-09-08T00:00:00.000Z')).toBe(
      '2026-09-08T00:00:00.000Z',
    )
  })
})
