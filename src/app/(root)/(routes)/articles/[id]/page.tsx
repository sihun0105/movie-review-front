import { Article } from '@/lib/type'
import { ArticleRepository } from '@/modules/article/article-repository'
import { notFound } from 'next/navigation'
import { FunctionComponent } from 'react'
import { ModifyArticleModalContextProvider } from './hooks/use-modify-article-context'
import { ModifyCommentModalContextProvider } from './hooks/use-modify-comment-context'
import ActiveSection from './sections/active-section'
import ArticleDataSection from './sections/article-data-section'
import CommentSection from './sections/comment-section'
import LikeSection from './sections/like-section'

interface PageProps {
  params: { id: string }
}

const getArticleData = async (id: string): Promise<Article> => {
  const repo = new ArticleRepository()
  try {
    return await repo.getArticle(id)
  } catch {
    notFound()
  }
}

const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  const data = await getArticleData(id)
  return (
    <div className="relative flex flex-col bg-background pb-[140px] text-foreground">
      <ModifyCommentModalContextProvider>
        <ModifyArticleModalContextProvider>
          <ArticleDataSection data={data} />
          <LikeSection id={id} />
          <CommentSection />
        </ModifyArticleModalContextProvider>
      </ModifyCommentModalContextProvider>
      <ActiveSection id={id} />
    </div>
  )
}

export default Page
