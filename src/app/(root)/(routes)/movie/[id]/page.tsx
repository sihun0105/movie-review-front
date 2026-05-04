import { Metadata } from 'next'
import { FunctionComponent } from 'react'
import { getMovieDetail, getReviews, getScore } from './data'
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
  const movie = await getMovieDetail(id)
  const reviews = await getReviews(id)
  const score = await getScore(id)

  const movieJsonLd = buildMovieJsonLd(id, movie, reviews, score)
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(id, movie.title)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movieJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <div
        id="movie-detail-page"
        className="relative flex flex-col bg-background pb-[88px] text-foreground"
      >
        <ModifyCommentModalContextProvider>
          <VodModalContextProvider>
            <DescriptionSection id={id} />
            <CommentSection id={id} />
          </VodModalContextProvider>
        </ModifyCommentModalContextProvider>
      </div>
    </>
  )
}

export default Page
