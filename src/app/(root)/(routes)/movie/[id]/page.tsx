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

  return (
    <main
      id="movie-detail-page"
      className="container flex min-h-screen flex-col gap-2"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Movie',
            name: movieData.title,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: score.averageScore.toFixed(1), // 소수점 1자리 권장
              ratingCount: score.scoreCount, // 평점을 준 총 인원수
              reviewCount: reviews.length, // 댓글 개수
              bestRating: '5',
              worstRating: '1',
            },
            review: reviews.map((r) => ({
              '@type': 'Review',
              author: { '@type': 'Person', name: r.nickname },
              reviewBody: r.comment,
            })),
          }),
        }}
      />
      <VodModalContextProvider>
        <DescriptionSection id={id} />
        <CommentSection />
        <ActiveSection id={id} />
      </VodModalContextProvider>
    </main>
  )
}

export default Page
