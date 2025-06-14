import { FunctionComponent } from 'react'
import ArticleDataSection from './sections/article-data-section'
import LikeSection from './sections/like-section'
import CommentSection from './sections/comment-section'
import { Article } from '@/lib/type'
import { ArticleRepository } from '@/modules/article/article-repository'
interface PageProps {
  params: {
    id: string
  }
}

const getArticleData = async (id: string): Promise<Article> => {
  const repo = new ArticleRepository()
  return repo.getArticle(id)
}
const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  const data = await getArticleData(id)
  return (
    <main>
      <ArticleDataSection data={data} />
      <LikeSection id={id} />
      {/* <CommentSection /> */}
    </main>
  )
}

export default Page
