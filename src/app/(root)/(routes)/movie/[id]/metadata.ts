import { Metadata } from 'next'
import { getMovieDetail, getScore, hasValidScore } from './data'
import { sitemapModifiedDate } from '@/lib/seo/public-discovery'

const SITE_URL = 'https://bollae.kr'

export async function generateMovieMetadata(id: string): Promise<Metadata> {
  // Resolve existence before streaming so notFound becomes an HTTP 404.
  const movie = await getMovieDetail(id)
  const score = await getScore(id)
  const validScore = hasValidScore(score)
  const genres =
    movie.genre
      ?.split(/[,/·]/)
      .map((g) => g.trim())
      .filter(Boolean) ?? []
  const year = movie.openedAt ? new Date(movie.openedAt).getFullYear() : NaN
  const description = [
    movie.plot?.trim() ||
      `${movie.title}의 영화 정보와 관객 평점을 볼래에서 확인하세요.`,
    movie.director && `감독: ${movie.director}`,
    Number.isFinite(year) && `${year}년 개봉`,
    validScore &&
      `평점 ${score.averageScore.toFixed(1)}/5 (${score.scoreCount}명 평가)`,
  ]
    .filter(Boolean)
    .join(' | ')
  const title = `${movie.title} - 볼래`
  const url = `${SITE_URL}/movie/${id}`
  const image = movie.poster?.trim() || `${SITE_URL}/images/og-image.png`
  const modifiedTime = sitemapModifiedDate(String(movie.updatedAt))

  return {
    title,
    description: description.slice(0, 160),
    authors: [{ name: '볼래' }],
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      type: 'video.movie',
      url,
      siteName: '볼래',
      locale: 'ko_KR',
      images: [{ url: image, alt: `${movie.title} 포스터` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    other: {
      'movie:title': movie.title,
      'movie:director': movie.director || '',
      'movie:genre': genres.join(', '),
      ...(modifiedTime ? { 'article:modified_time': modifiedTime } : {}),
    },
  }
}
