import { describe, expect, it } from 'vitest'
import { Article } from '@/lib/type'
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  serializeJsonLd,
} from './seo'

const article: Article = {
  id: '5',
  title: '그랜드 부다페스트 호텔 후기',
  userno: 4,
  content:
    '**웨스 앤더슨** 특유의 [대칭 구도](https://example.com)가 좋았음.\n\n' +
    '![호텔 장면](https://cdn.example.com/hotel.gif)',
  author: '영화조아용',
  likeCount: 1,
  dislikeCount: 0,
  commentCount: 0,
  viewCount: 12,
  createdAt: '2026-07-18T13:30:15.424Z',
  updatedAt: '2026-07-19T01:02:03.000Z',
}

describe('article detail SEO', () => {
  it('builds unique indexable metadata with a self canonical URL', () => {
    const metadata = buildArticleMetadata(article)
    const openGraph = metadata.openGraph as any

    expect(metadata.title).toBe('그랜드 부다페스트 호텔 후기 | 볼래')
    expect(metadata.alternates?.canonical).toBe(
      'https://bollae.kr/articles/5',
    )
    expect(metadata.description).toBe(
      '웨스 앤더슨 특유의 대칭 구도가 좋았음.',
    )
    expect(metadata.robots).toMatchObject({ index: true, follow: true })
    expect(openGraph).toMatchObject({
      type: 'article',
      url: 'https://bollae.kr/articles/5',
      title: '그랜드 부다페스트 호텔 후기 | 볼래',
      publishedTime: '2026-07-18T13:30:15.424Z',
      modifiedTime: '2026-07-19T01:02:03.000Z',
    })
    expect(openGraph.images[0].url).toBe(
      'https://cdn.example.com/hotel.gif',
    )
  })

  it('describes the page as a BlogPosting and breadcrumb destination', () => {
    const [posting, breadcrumb] = buildArticleJsonLd(article) as any[]

    expect(posting).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: '그랜드 부다페스트 호텔 후기',
      url: 'https://bollae.kr/articles/5',
      datePublished: '2026-07-18T13:30:15.424Z',
      dateModified: '2026-07-19T01:02:03.000Z',
      author: { '@type': 'Person', name: '영화조아용' },
      image: 'https://cdn.example.com/hotel.gif',
    })
    expect(breadcrumb.itemListElement[2]).toMatchObject({
      name: '그랜드 부다페스트 호텔 후기',
      item: 'https://bollae.kr/articles/5',
    })
  })

  it('escapes script-closing markup when serializing JSON-LD', () => {
    expect(serializeJsonLd({ headline: '</script><script>' })).toContain(
      '\\u003c/script>',
    )
  })
})
