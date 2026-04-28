import { Reply } from '@/lib/type'
import { CommentRepository } from '@/modules/comment/comment-repository'
import { AverageMovieScore, Movie } from '@/modules/movie/movie.entity'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { Metadata } from 'next'
import { FunctionComponent } from 'react'
import { ModifyCommentModalContextProvider } from './hooks/use-modify-comment-context'
import { VodModalContextProvider } from './hooks/use-vod-modal-context'
import ActiveSection from './sections/active-section'
import CommentSection from './sections/comment-section'
import DescriptionSection from './sections/description-section'

interface PageProps {
  params: {
    id: string
  }
}

const getMovieList = async (id: string): Promise<Movie> => {
  const repo = new MovieRepository()
  return repo.getMovieDetail(id)
}

const getReviews = async (id: string): Promise<Reply[]> => {
  const repo = new CommentRepository()
  const result = await repo.getCommentList(id, 1)
  return result.comments
}

const getScore = async (id: string): Promise<AverageMovieScore | null> => {
  try {
    const repo = new MovieRepository()
    return repo.getAverageScore(id)
  } catch (error) {
    console.error('Failed to get average score:', error)
    // 기본값 반환
    return null
  }
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  try {
    const movie = await getMovieList(id)
    const score = await getScore(id)

    // 유효한 평점 확인
    const hasValidScore =
      score &&
      typeof score.averageScore === 'number' &&
      !isNaN(score.averageScore) &&
      score.averageScore > 0 &&
      score.averageScore <= 5 &&
      score.scoreCount > 0

    // 동적 키워드 생성 (더 구체적으로)
    const keywords = [
      movie.title,
      `${movie.title} 리뷰`,
      `${movie.title} 평점`,
      `${movie.title} 영화`,
      ...(Array.isArray(movie.genre) ? movie.genre : [movie.genre])
        .filter(Boolean)
        .map((g) => `${g} 영화`),
      movie.director && `${movie.director} 감독`,
      '영화 리뷰',
      '영화 평점',
      'DrunkenMovie',
      '영화뭐함',
      '한국 영화 리뷰',
      hasValidScore && `평점 ${score.averageScore.toFixed(1)}점`,
    ]
      .filter(Boolean)
      .join(', ')

    // 더 상세한 설명 생성
    let description = movie.plot

    // 리뷰 개수 가져오기
    const reviews = await getReviews(id)
    const validReviewCount = reviews.filter(
      (r) =>
        r && r.content && r.content.trim() && r.nickname && r.nickname.trim(),
    ).length

    // 평점 정보가 있을 때 추가
    if (hasValidScore) {
      const ratingText = `⭐ ${score.averageScore.toFixed(1)}/5.0 (${score.scoreCount.toLocaleString()}명 평가${validReviewCount > 0 ? `, ${validReviewCount}개 리뷰` : ''})`
      description = `${description} | ${ratingText}`
    } else if (validReviewCount > 0) {
      description = `${description} | ${validReviewCount}개의 사용자 리뷰`
    }

    // 장르 정보 추가
    const genreText = Array.isArray(movie.genre)
      ? movie.genre.join(', ')
      : movie.genre
    if (genreText) {
      description = `[${genreText}] ${description}`
    }

    // 감독 정보 추가
    if (movie.director) {
      description = `${description} | 감독: ${movie.director}`
    }

    // 개봉년도 정보 추가
    if (movie.openedAt) {
      const year = new Date(movie.openedAt).getFullYear()
      if (!isNaN(year)) {
        description = `${description} | ${year}년 개봉`
      }
    }

    const title = `${movie.title} - DrunkenMovie`

    const currentDate = new Date().toISOString().slice(0, 10)

    return {
      title,
      description: description.slice(0, 160), // Google 권장 길이로 제한
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
      alternates: {
        canonical: `https://drunkenmovie.shop/movie/${id}`,
      },
      metadataBase: new URL('https://drunkenmovie.shop'),
      // 구조화 데이터 힌트를 위한 추가 메타데이터
      other: {
        'movie:title': movie.title,
        'movie:director': movie.director || '',
        'movie:genre': genreText || '',
        'movie:rating': hasValidScore ? score.averageScore.toString() : '',
        'movie:rating_count': hasValidScore ? score.scoreCount.toString() : '',
        'movie:review_count': validReviewCount.toString(),
        // 추가 SEO 메타태그
        'article:published_time': movie.openedAt
          ? new Date(movie.openedAt).toISOString().slice(0, 10)
          : currentDate,
        'article:modified_time': currentDate,
        'article:section': 'Movies',
        'article:tag': genreText || '',
        // Rich snippet 관련 (undefined 제거)
        ...(hasValidScore && {
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
    // 기본 메타데이터 반환
    return {
      title: '영화 상세 - DrunkenMovie',
      description: 'DrunkenMovie에서 다양한 영화 정보와 리뷰를 확인하세요.',
      metadataBase: new URL('https://drunkenmovie.shop'),
    }
  }
}

const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  const movieData = await getMovieList(id)
  const reviews = await getReviews(id)
  const score = await getScore(id)

  // 유효한 평점 데이터 확인
  const hasValidRating =
    score &&
    typeof score.averageScore === 'number' &&
    !isNaN(score.averageScore) &&
    score.averageScore > 0 &&
    score.averageScore <= 5 &&
    score.scoreCount > 0

  // 구조화 데이터 생성 (Google Movie schema 최적화)
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    '@id': `https://drunkenmovie.shop/movie/${id}`,
    name: movieData.title,
    description: movieData.plot,
    image: [
      {
        '@type': 'ImageObject',
        url: movieData.poster,
        caption: `${movieData.title} 포스터`,
        width: 400,
        height: 600,
      },
    ],
    url: `https://drunkenmovie.shop/movie/${id}`,
    sameAs: `https://drunkenmovie.shop/movie/${id}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://drunkenmovie.shop/movie/${id}`,
      url: `https://drunkenmovie.shop/movie/${id}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DrunkenMovie',
      url: 'https://drunkenmovie.shop',
    },
  }

  // 장르 정보 추가 (문자열 배열로 정규화)
  if (movieData.genre) {
    const genres = Array.isArray(movieData.genre)
      ? movieData.genre
      : [movieData.genre]
    jsonLd.genre = genres.filter((g) => g && g.trim())
  }

  // 개봉일이 있을 때만 추가
  if (movieData.openedAt) {
    const releaseDate = new Date(movieData.openedAt)
    if (!isNaN(releaseDate.getTime())) {
      jsonLd.datePublished = releaseDate.toISOString().split('T')[0]
      jsonLd.releaseDate = releaseDate.toISOString().split('T')[0]
    }
  }

  // 감독 정보가 있을 때만 추가
  if (movieData.director && movieData.director.trim()) {
    jsonLd.director = {
      '@type': 'Person',
      name: movieData.director.trim(),
    }
  }

  // 평점 등급 정보 추가
  if (movieData.ratting && movieData.ratting.trim()) {
    jsonLd.contentRating = movieData.ratting.trim()
  }

  // 유효한 리뷰가 있을 때만 추가
  const validReviews = reviews.filter(
    (r) =>
      r && r.content && r.content.trim() && r.nickname && r.nickname.trim(),
  )

  if (validReviews.length > 0) {
    jsonLd.review = validReviews.slice(0, 10).map((r, index) => {
      // 최대 10개 리뷰만 포함
      const review: any = {
        '@type': 'Review',
        '@id': `https://drunkenmovie.shop/movie/${id}#review${index + 1}`,
        author: {
          '@type': 'Person',
          name: r.nickname.trim(),
        },
        reviewBody: r.content.trim(),
        inLanguage: 'ko',
        itemReviewed: {
          '@type': 'Movie',
          '@id': `https://drunkenmovie.shop/movie/${id}`,
          name: movieData.title,
        },
      }

      if (r.createdAt) {
        const createdDate = new Date(r.createdAt)
        if (!isNaN(createdDate.getTime())) {
          review.datePublished = createdDate.toISOString()
        }
      }

      return review
    })
  }

  // 유효한 평점이 있을 때만 aggregateRating 추가 (Google 권장 형식)
  if (hasValidRating) {
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      '@id': `https://drunkenmovie.shop/movie/${id}#aggregateRating`,
      ratingValue: Number(score.averageScore.toFixed(1)), // 소수점 1자리로 변경
      ratingCount: score.scoreCount,
      reviewCount: validReviews.length,
      bestRating: 5,
      worstRating: 1,
    }

    // 평점이 있을 때 Movie 객체에 추가 정보 제공
    jsonLd.aggregateRating.itemReviewed = {
      '@type': 'Movie',
      '@id': `https://drunkenmovie.shop/movie/${id}`,
      name: movieData.title,
    }
  }

  // 추가 SEO 향상을 위한 속성
  jsonLd.potentialAction = {
    '@type': 'WatchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `https://drunkenmovie.shop/movie/${id}`,
      actionPlatform: [
        'https://schema.org/DesktopWebPlatform',
        'https://schema.org/IOSPlatform',
        'https://schema.org/AndroidPlatform',
      ],
    },
  }

  // BreadcrumbList 구조화 데이터 추가
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: 'https://drunkenmovie.shop',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '영화',
        item: 'https://drunkenmovie.shop',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: movieData.title,
        item: `https://drunkenmovie.shop/movie/${id}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div
        id="movie-detail-page"
        className="relative flex flex-col bg-dm-bg pb-[140px] text-dm-text"
      >
        <ModifyCommentModalContextProvider>
          <VodModalContextProvider>
            <DescriptionSection id={id} />
            <CommentSection />
          </VodModalContextProvider>
        </ModifyCommentModalContextProvider>
      </div>
      <ActiveSection id={id} />
    </>
  )
}

export default Page
