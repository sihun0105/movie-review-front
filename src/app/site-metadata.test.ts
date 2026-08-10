import { describe, expect, it } from 'vitest'
import { siteJsonLd } from './site-metadata'

describe('site structured data', () => {
  it('does not advertise a search route that does not exist', () => {
    expect(siteJsonLd).not.toHaveProperty('potentialAction')
  })
})
