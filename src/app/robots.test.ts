import { describe, expect, it } from 'vitest'
import robots from './robots'

describe('robots metadata', () => {
  it('allows public chat while private chat remains blocked', () => {
    const metadata = robots()
    const rule = Array.isArray(metadata.rules)
      ? metadata.rules[0]
      : metadata.rules

    expect(rule.allow).toContain('/chat/public')
    expect(rule.disallow).toContain('/chat/')
    expect(metadata.sitemap).toBe('https://bollae.kr/sitemap.xml')
  })
})
