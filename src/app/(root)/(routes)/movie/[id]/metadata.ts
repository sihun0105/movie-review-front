import { Metadata } from 'next'
import { getMovieDetail, getReviews, getScore, hasValidScore } from './data'

const FALLBACK: Metadata = {
  title: '영화 상세 - DrunkenMovie',
  description: 'DrunkenMovie에서 다양한 영화 정보와 리뷰를 확인하세요.',
  metadataBase: new URL('https://drunkenmovie.shop'),
}

function genreList(genre: unknown): string[] {
  return (Array.isArray(genre) ? genre : [genre])
    .filter((g): g is string => Boolean(g))
}

export async function generateMovieMetadata(id: string): Promise<Metadata> {
  try {
    const movie = await getMovieDetail(id)
    const score = await getScore(id)
    const validScore = hasValidScore(score)

    const keywords = [
      movie.title,
      `${movie.title} 리뷰`,
      `${movie.title} 평점`,
      `${movie.title} 영화`,
      ...genreList(movie.genre).map((g) => `${g} 영화`),
      movie.director && `${movie.director} 감독`,
      '영화 리뷰',
      '영화 평점',
      'DrunkenMovie',
      '영화뭐함',
      '한국 영화 리뷰',
      validScore && `평점 ${score.averageScore.toFixed(1)}점`,
    ]
      .filter(Boolean)
      .join(', ')

    let description = movie.plot

    const reviews = await getReviews(id)
    const validReviewCount = reviews.filter(
      (r) =>
        r && r.content && r.content.trim() && r.nickname && r.nickname.trim(),
    ).length

    if (validScore) {
      const ratingText = `⭐ ${score.averageScore.toFixed(1)}/5.0 (${score.scoreCount.toLocaleString()}명 평가${
        validReviewCount > 0 ? `, ${validReviewCount}개 리뷰` : ''
      })`
      description = `${description} | ${ratingText}`
    } else if (validReviewCount > 0) {
      description = `${description} | ${validReviewCount}개의 사용자 리뷰`
    }

    const genreText = genreList(movie.genre).join(', ')
    if (genreText) description = `[${genreText}] ${description}`
    if (movie.director) description = `${description} | 감독: ${movie.director}`

    if (movie.openedAt) {
      const year = new Date(movie.openedAt).getFullYear()
      if (!isNaN(year)) description = `${description} | ${year}년 개봉`
    }

    const title = `${movie.title} - DrunkenMovie`
    const currentDate = new Date().toISOString().slice(0, 10)

    return {
      title,
      description: description.slice(0, 160),
      keywords,
      authors: [{ name: 'DrunkenMovie' }],
      publisher: 'DrunkenMovie',
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        title,
        description,
        type: 'video.movie',
        url: `https://drunkenmovie.shop/movie/${id}`,
        siteName: 'DrunkenMovie',
        locale: 'ko_KR',
        images: [
          {
            url: movie.poster,
            alt: `${movie.title} 포스터`,
            width: 400,
            height: 600,
          },
        ],
        videos:
          movie.vods?.length > 0
            ? movie.vods.map((vod) => ({
                url: vod.vodUrl,
                type: 'video/mp4',
              }))
            : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        site: '@DrunkenMovie',
        title,
        description,
        images: [movie.poster],
      },
      alternates: { canonical: `https://drunkenmovie.shop/movie/${id}` },
      metadataBase: new URL('https://drunkenmovie.shop'),
      other: {
        'movie:title': movie.title,
        'movie:director': movie.director || '',
        'movie:genre': genreText || '',
        'movie:rating': validScore ? score.averageScore.toString() : '',
        'movie:rating_count': validScore ? score.scoreCount.toString() : '',
        'movie:review_count': validReviewCount.toString(),
        'article:published_time': movie.openedAt
          ? new Date(movie.openedAt).toISOString().slice(0, 10)
          : currentDate,
        'article:modified_time': currentDate,
        'article:section': 'Movies',
        'article:tag': genreText || '',
        ...(validScore && {
          rating: score.averageScore.toString(),
          ratingCount: score.scoreCount.toString(),
        }),
        ...(validReviewCount > 0 && {
          reviewCount: validReviewCount.toString(),
        }),
      },
    }
  } catch (error) {
    console.error('Failed to generate metadata:', error)
    return FALLBACK
  }
}
