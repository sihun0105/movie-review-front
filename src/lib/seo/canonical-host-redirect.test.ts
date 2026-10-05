import { describe, expect, it } from 'vitest'

const nextConfig = require('../../../next.config.js') as {
  redirects: () => Promise<
    Array<{
      source: string
      destination: string
      permanent: boolean
      has?: Array<{ type: string; value: string }>
    }>
  >
}

describe('canonical host redirect', () => {
  it('permanently redirects www requests to bollae.kr', async () => {
    const redirects = await nextConfig.redirects()

    expect(redirects).toContainEqual({
      source: '/:path*',
      has: [{ type: 'host', value: 'www.bollae.kr' }],
      destination: 'https://bollae.kr/:path*',
      permanent: true,
    })
  })
})
