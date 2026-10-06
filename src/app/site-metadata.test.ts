import { describe, expect, it } from 'vitest'
import { siteJsonLd, siteMetadata } from './site-metadata'

describe('site structured data', () => {
  it('does not advertise a search route that does not exist', () => {
    expect(siteJsonLd).not.toHaveProperty('potentialAction')
  })

  it('allows users to zoom the mobile viewport', () => {
    expect(siteMetadata.viewport).toMatchObject({
      width: 'device-width',
      initialScale: 1,
    })
    expect(siteMetadata.viewport).not.toHaveProperty('maximumScale')
  })
})
