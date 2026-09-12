import { Metadata } from 'next'
import { FunctionComponent } from 'react'
import {
  getMovieDetail,
  getCommentPage,
  getScore,
  getFilmography,
} from './data'
import { ModifyCommentModalContextProvider } from './hooks/use-modify-comment-context'
import { VodModalContextProvider } from './hooks/use-vod-modal-context'
import { buildBreadcrumbJsonLd, buildMovieJsonLd } from './json-ld'
import { generateMovieMetadata } from './metadata'
import CommentSection from './sections/comment-section'
import DescriptionSection from './sections/description-section'

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  return generateMovieMetadata(id)
}

const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  const [movie, commentPage, score] = await Promise.all([
    getMovieDetail(id),
    getCommentPage(id),
    getScore(id),
  ])
  const reviews = commentPage?.comments ?? []
  const filmography = await getFilmography(movie)

  const movieJsonLd = buildMovieJsonLd(id, movie, reviews, score)
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(id, movie.title)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(movieJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div
        id="movie-detail-page"
        className="relative flex flex-col bg-background pb-4 text-foreground"
      >
        <ModifyCommentModalContextProvider>
          <VodModalContextProvider>
            <DescriptionSection
              key={id}
              id={id}
              initialMovie={movie}
              initialFilmography={filmography}
            />
            <CommentSection id={id} initialData={commentPage} />
          </VodModalContextProvider>
        </ModifyCommentModalContextProvider>
      </div>
    </>
  )
}

export default Page
