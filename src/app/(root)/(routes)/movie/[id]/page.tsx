import { Reply } from '@/lib/type'
import { CommentRepository } from '@/modules/comment/comment-repository'
import { AverageMovieScore, Movie } from '@/modules/movie/movie-entity'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { FunctionComponent } from 'react'
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
  const result = await repo.getMovieDetail(id)
  return result
}
const getReviews = async (id: string): Promise<Reply[]> => {
  const repo = new CommentRepository()
  const result = await repo.getCommentList(id, 1)
  return result.comments
}
const getScore = async (id: string): Promise<AverageMovieScore> => {
  const repo = new MovieRepository()
  const result = await repo.getAverageScore(id)
  return result
}

const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  const movieData = await getMovieList(id)
  const reviews = await getReviews(id)
  const score = await getScore(id)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movieData.title,
    genre: movieData.genre,
    description: movieData.plot,
    image: movieData.poster,
    url: `https://drunkenmovie.shop/movie/${id}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: score.averageScore.toFixed(1),
      ratingCount: score.scoreCount,
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.nickname },
      reviewBody: r.comment,
    })),
  }
  return (
    <>
      <head>
        <title>{movieData.title} - DrunkenMovie</title>
        <meta name="description" content={movieData.plot} />
        <meta name="keywords" content={movieData.genre} />
        <meta property="og:title" content={movieData.title} />
        <meta property="og:description" content={movieData.plot} />
        <meta property="og:image" content={movieData.poster} />
        <meta
          property="og:url"
          content={`https://drunkenmovie.shop/movie/${id}`}
        />
        <meta property="og:type" content="movie" />
        <meta property="og:site_name" content="DrunkenMovie" />
        <meta property="og:locale" content="ko_KR" />
        <script
          type="application/ld+json"
          data-rh="true"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <main
        id="movie-detail-page"
        className="container flex min-h-screen flex-col gap-2"
      >
        <VodModalContextProvider>
          <DescriptionSection id={id} />
          <CommentSection />
          <ActiveSection id={id} />
        </VodModalContextProvider>
      </main>
    </>
  )
}

export default Page
