import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/chat/public'],
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://bollae.kr/sitemap.xml',
  }
}
