import type { Metadata } from 'next'

const SITE_URL = 'https://bollae.kr'

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '볼래 | 같이 볼 사람을 찾는 영화 매칭',
  description:
    '볼래에서 오늘 같이 볼 사람을 찾고, 최신 영화 리뷰와 평점을 확인하세요.',
  keywords: [
    '볼래',
    'bollae',
    '영화 매칭',
    '같이 볼래',
    '영화 약속',
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
  ],
  authors: [{ name: '볼래' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '볼래',
    title: '볼래 | 같이 볼 사람을 찾는 영화 매칭',
    description:
      '볼래에서 오늘 같이 볼 사람을 찾고, 최신 영화 리뷰와 평점을 확인하세요.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '볼래 OG 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '볼래 | 같이 볼 사람을 찾는 영화 매칭',
    description: '볼래에서 오늘 같이 볼 사람을 찾고, 최신 영화 리뷰와 평점을 확인하세요.',
    images: ['/images/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '볼래',
  alternateName: ['bollae', '같이 볼래'],
  url: SITE_URL,
  description: '볼래에서 오늘 같이 볼 사람을 찾고, 최신 영화 리뷰와 평점을 확인하세요.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  mainEntity: {
    '@type': 'Organization',
    name: '볼래',
    sameAs: [SITE_URL],
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/og-image.png`,
    },
  },
}
