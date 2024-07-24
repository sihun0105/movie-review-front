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
    <main className=" w-full">
      <CommentSection />
      <ActiveSection id={id} />
    </main>
  )
}

export default Page
