import { Article } from '@/lib/type'
import { Metadata } from 'next'

const SITE_URL = 'https://bollae.kr'
const DEFAULT_IMAGE = `${SITE_URL}/images/og-image.png`
const DEFAULT_DESCRIPTION = '볼래 영화 커뮤니티의 영화 이야기입니다.'

function articleUrl(id: string): string {
  return `${SITE_URL}/articles/${id}`
}

function extractFirstImage(content: string): string {
  const match = content.match(/!\[[^\]]*]\((https?:\/\/[^)\s]+)[^)]*\)/)
  return match?.[1] || DEFAULT_IMAGE
}

function markdownToPlainText(content: string): string {
  return content
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildDescription(article: Article): string {
  const text = markdownToPlainText(article.content) || DEFAULT_DESCRIPTION
  return Array.from(text).slice(0, 160).join('')
}

export function buildArticleMetadata(article: Article): Metadata {
  const url = articleUrl(article.id)
  const title = `${article.title} | 볼래`
  const description = buildDescription(article)
  const image = extractFirstImage(article.content)
  const modifiedTime = article.updatedAt || article.createdAt

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: [
      article.title,
      `${article.title} 후기`,
      `${article.title} 리뷰`,
      '영화 후기',
      '영화 리뷰',
      '볼래',
    ],
    authors: [{ name: article.author }],
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'article',
      locale: 'ko_KR',
      siteName: '볼래',
      url,
      title,
      description,
      publishedTime: article.createdAt,
      modifiedTime,
      authors: [article.author],
      images: [{ url: image, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export function buildArticleJsonLd(article: Article): object[] {
  const url = articleUrl(article.id)
  const image = extractFirstImage(article.content)

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: buildDescription(article),
      image,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      datePublished: article.createdAt,
      dateModified: article.updatedAt || article.createdAt,
      author: { '@type': 'Person', name: article.author },
      publisher: {
        '@type': 'Organization',
        name: '볼래',
        logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: '커뮤니티',
          item: `${SITE_URL}/articles`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: url,
        },
      ],
    },
  ]
}

export function serializeJsonLd(value: object): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
