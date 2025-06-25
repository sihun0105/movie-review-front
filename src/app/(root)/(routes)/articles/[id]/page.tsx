import { Article } from '@/lib/type'
import { ArticleRepository } from '@/modules/article/article-repository'
import { FunctionComponent } from 'react'
import ArticleDataSection from './sections/article-data-section'
import CommentSection from './sections/comment-section'
import ActiveSection from './sections/active-section'
import LikeSection from './sections/like-section'
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
    <main className="container flex flex-col">
      <ArticleDataSection data={data} />
      <LikeSection id={id} />
      <CommentSection />
      <ActiveSection id={id} className="sticky bottom-14" />
    </main>
  )
}

export default Page
