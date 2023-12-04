import { getToken } from '@/lib/utils/getToken'
import { Comment } from '@/modules/comment/comment-entity'
import { CommentRepository } from '@/modules/comment/comment-repository'
import { FunctionComponent } from 'react'
interface PageProps {
  params: {
    id: string
  }
}
const getMovieList = async (id: string): Promise<Comment[]> => {
  const token = await getToken()
  const repo = new CommentRepository(token)
  const result = await repo.getCommentList(id)
  return result
}
const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  const data = await getMovieList(id)
  return (
    <main>
      {data.map((comment, idx) => {
        return (
          <div key={idx}>
            <p>{comment.comment}</p>
          </div>
        )
      })}
    </main>
  )
}

export default Page
