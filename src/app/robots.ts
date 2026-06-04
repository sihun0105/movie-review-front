import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/account/',
          '/api/',
          '/articles/new',
          '/chat/',
          '/match/my-matches',
          '/match/new',
          '/notifications',
          '/settings',
          '/setup-nickname',
        ],
      },
    ],
    sitemap: 'https://bollae.kr/sitemap.xml',
  }
}
