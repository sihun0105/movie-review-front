import { FunctionComponent } from 'react'
import ActiveSection from './sections/active-section'
import CommentSection from './sections/comment-section'
interface PageProps {
  params: {
    id: string
  }
}

const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  return (
    <main className="container flex flex-col">
      <CommentSection />
      <div className="container fixed bottom-4 left-0 right-0 mx-auto w-full max-w-[460px]">
        <ActiveSection id={id} />
      </div>
    </main>
  )
}

export default Page
