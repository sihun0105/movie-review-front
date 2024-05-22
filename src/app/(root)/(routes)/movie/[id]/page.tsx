import { getTokenFromCookie } from '@/lib/utils/getToken'
import { Comment } from '@/modules/comment/comment-entity'
import { CommentRepository } from '@/modules/comment/comment-repository'
import { FunctionComponent, use } from 'react'
import ReviewCard from './components/review-card'
import ActiveSection from './sections/active-section'
interface PageProps {
  params: {
    id: string
  }
}
const getMovieList = async (id: string): Promise<Comment[]> => {
  const token = await getTokenFromCookie()
  const repo = new CommentRepository(token)
  const result = await repo.getCommentList(id)
  return result
}
const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  const data = await getMovieList(id)
  return (
    <main className=" w-full">
      {data.map((comment, idx) => {
        return <ReviewCard comment={comment} key={idx} />
      })}
      <ActiveSection id={id} />
    </main>
  )
}

export default Page