import { Reply } from '@/lib/type'
import { AverageMovieScore, Movie } from '@/modules/movie/movie.entity'
import { hasValidScore } from './data'

const BASE = 'https://bollae.kr'

export function buildMovieJsonLd(
  id: string,
  movie: Movie,
  reviews: Reply[],
  score: AverageMovieScore | null,
) {
  const validReviews = reviews.filter(
    (r) =>
      r &&
      !r.isDeleted &&
      typeof r.rating === 'number' &&
      r.rating >= 1 &&
      r.rating <= 5 &&
      r.content &&
      r.content.trim() &&
      r.nickname &&
      r.nickname.trim(),
  )
  const validScore = hasValidScore(score)

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    '@id': `${BASE}/movie/${id}`,
    name: movie.title,
    description: movie.plot,
    ...(movie.poster?.trim()
      ? {
          image: [
            {
              '@type': 'ImageObject',
              url: movie.poster,
              caption: `${movie.title} 포스터`,
              width: 400,
              height: 600,
            },
          ],
        }
      : {}),
    url: `${BASE}/movie/${id}`,
    sameAs: `${BASE}/movie/${id}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE}/movie/${id}`,
      url: `${BASE}/movie/${id}`,
    },
    publisher: {
      '@type': 'Organization',
      name: '볼래',
      url: BASE,
    },
  }

  if (movie.genre) {
    const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre]
    jsonLd.genre = genres.filter((g) => g && g.trim())
  }

  if (movie.openedAt) {
    const released = new Date(movie.openedAt)
    if (!isNaN(released.getTime())) {
      const date = released.toISOString().split('T')[0]
      jsonLd.datePublished = date
      jsonLd.releaseDate = date
    }
  }

  if (movie.director?.trim()) {
    jsonLd.director = { '@type': 'Person', name: movie.director.trim() }
  }
  if (movie.ratting?.trim()) jsonLd.contentRating = movie.ratting.trim()

  if (validReviews.length > 0) {
    jsonLd.review = validReviews.slice(0, 10).map((r) => {
      const review: Record<string, unknown> = {
        '@type': 'Review',
        '@id': `${BASE}/movie/${id}#comment-${r.id}`,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
        author: { '@type': 'Person', name: r.nickname.trim() },
        reviewBody: r.content.trim(),
        inLanguage: 'ko',
        itemReviewed: {
          '@type': 'Movie',
          '@id': `${BASE}/movie/${id}`,
          name: movie.title,
        },
      }
      if (r.createdAt) {
        const created = new Date(r.createdAt)
        if (!isNaN(created.getTime())) {
          review.datePublished = created.toISOString()
        }
      }
      return review
    })
  }

  if (validScore) {
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      '@id': `${BASE}/movie/${id}#aggregateRating`,
      ratingValue: Number(score.averageScore.toFixed(1)),
      ratingCount: score.scoreCount,
      bestRating: 5,
      worstRating: 1,
      itemReviewed: {
        '@type': 'Movie',
        '@id': `${BASE}/movie/${id}`,
        name: movie.title,
      },
    }
  }

  return jsonLd
}

export function buildBreadcrumbJsonLd(id: string, title: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: BASE },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: `${BASE}/movie/${id}`,
      },
    ],
  }
}
