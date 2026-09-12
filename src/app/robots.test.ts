import { describe, expect, it } from 'vitest'
import robots from './robots'

describe('robots metadata', () => {
  it('allows functional pages to be crawled for noindex while blocking only API routes', () => {
    const metadata = robots()
    const rule = Array.isArray(metadata.rules)
      ? metadata.rules[0]
      : metadata.rules

    expect(rule.allow).toContain('/chat/public')
    expect(rule.disallow).toEqual(['/api/'])
    expect(metadata.sitemap).toBe('https://bollae.kr/sitemap.xml')
  })
})
