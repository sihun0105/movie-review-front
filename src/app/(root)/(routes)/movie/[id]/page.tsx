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

const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  return (
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
  )
}

export default Page
