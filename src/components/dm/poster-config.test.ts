import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const { images } = require('../../../next.config.js')

describe('poster image optimizer configuration', () => {
  it('allows only the existing HTTPS S3 bucket, not arbitrary S3 hosts', () => {
    const s3 = images.remotePatterns.filter((p: { hostname: string }) =>
      p.hostname.includes('amazonaws'),
    )
    expect(s3).toEqual([
      {
        protocol: 'https',
        hostname:
          'bollae-uploads-prod-058511778476-ap-northeast-2-an.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ])
  })

  it('retains existing movie image providers and modern formats', () => {
    expect(images.domains).toEqual(
      expect.arrayContaining([
        'kmdb.or.kr',
        'file.koreafilm.or.kr',
        'image.tmdb.org',
      ]),
    )
    expect(images.formats).toEqual(['image/avif', 'image/webp'])
  })
})
