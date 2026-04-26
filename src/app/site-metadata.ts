import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://drunkenmovie.shop'),
  title: '영화 뭐함 - 영화뭐함 | 최신 영화 리뷰와 추천',
  description:
    '영화 뭐함? 영화뭐함에서 최신 영화 리뷰, 평점, 추천을 확인하세요! 어떤 영화를 볼지 고민될 때 영화 뭐함 사이트에서 완벽한 답을 찾으세요.',
  keywords: [
    '영화 뭐함',
    '영화뭐함',
    '영화 추천',
    '영화 리뷰',
    '영화 평점',
    '최신 영화',
    '영화 순위',
    '영화 정보',
    '영화 커뮤니티',
    '영화 고민',
    '무슨 영화',
    '어떤 영화',
    '영화 선택',
    '영화 찾기',
    '볼만한 영화',
    'DrunkenMovie',
    'drunkenmovie',
  ],
  authors: [{ name: '영화뭐함 - DrunkenMovie' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://drunkenmovie.shop',
    siteName: '영화 뭐함 - 영화뭐함',
    title: '영화 뭐함? 영화뭐함에서 찾는 완벽한 영화 추천',
    description:
      '영화 뭐함? 영화뭐함에서 최신 영화 리뷰, 평점, 추천을 확인하세요! 어떤 영화를 볼지 고민될 때 완벽한 답을 찾으세요.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '영화 뭐함 - 영화뭐함 OG 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '영화 뭐함? 영화뭐함에서 찾는 완벽한 영화 추천',
    description:
      '영화 뭐함? 영화뭐함에서 최신 영화 리뷰, 평점, 추천을 확인하세요!',
    images: ['/images/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  alternates: {
    canonical: 'https://drunkenmovie.shop',
  },
}

export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '영화 뭐함 - 영화뭐함',
  alternateName: ['영화뭐함', '영화 뭐함', 'DrunkenMovie'],
  url: 'https://drunkenmovie.shop',
  description:
    '영화 뭐함? 영화뭐함에서 최신 영화 리뷰, 평점, 추천을 확인하세요!',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://drunkenmovie.shop/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  mainEntity: {
    '@type': 'Organization',
    name: '영화뭐함',
    sameAs: ['https://drunkenmovie.shop'],
    logo: {
      '@type': 'ImageObject',
      url: 'https://drunkenmovie.shop/images/og-image.png',
    },
  },
}
