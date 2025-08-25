import { Reply } from '@/lib/type'
import { CommentRepository } from '@/modules/comment/comment-repository'
import { AverageMovieScore, Movie } from '@/modules/movie/movie-entity'
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

const getScore = async (id: string): Promise<AverageMovieScore> => {
  const repo = new MovieRepository()
  return repo.getAverageScore(id)
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const movie = await getMovieList(id)
  // 동적 키워드 생성
  const keywords = [
    movie.title,
    ...(Array.isArray(movie.genre) ? movie.genre : [movie.genre]),
    '영화',
    '리뷰',
    '평론',
    'DrunkenMovie',
    '영화뭐함',
  ]
    .filter(Boolean)
    .join(', ')
  return {
    title: `${movie.title} - DrunkenMovie`,
    description: movie.plot,
    keywords, // 추가
    openGraph: {
      title: `${movie.title} - DrunkenMovie`,
      description: movie.plot,
      type: 'video.movie',
      url: `https://drunkenmovie.shop/movie/${id}`,
      images: [{ url: movie.poster }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${movie.title} - DrunkenMovie`,
      description: movie.plot,
      images: [movie.poster],
    },
    metadataBase: new URL('https://drunkenmovie.shop'),
  }
}

const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  const movieData = await getMovieList(id)
  const reviews = await getReviews(id)
  const score = await getScore(id)

  // 평가가 있는 경우에만 aggregateRating 포함
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movieData.title,
    genre: movieData.genre,
    description: movieData.plot,
    image: movieData.poster,
    url: `https://drunkenmovie.shop/movie/${id}`,
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.nickname },
      reviewBody: r.content,
    })),
  }

  // 점수가 있고 평가 수가 있을 때만 aggregateRating 추가
  if (score.scoreCount > 0 && score.averageScore > 0) {
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: score.averageScore.toFixed(1),
      ratingCount: score.scoreCount,
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1',
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        id="movie-detail-page"
        className="container relative flex min-h-screen flex-col gap-2"
      >
        <ModifyCommentModalContextProvider>
          <VodModalContextProvider>
            <DescriptionSection id={id} />
            <CommentSection />
          </VodModalContextProvider>
        </ModifyCommentModalContextProvider>
      </main>
      <ActiveSection id={id} className="container sticky bottom-14" />
    </>
  )
}

export default Page
