import { Article } from '@/lib/type'
import { HttpResponseError } from '@/lib/http-response-error'
import { ArticleRepository } from '@/modules/article/article-repository'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FunctionComponent, cache } from 'react'
import { ModifyArticleModalContextProvider } from './hooks/use-modify-article-context'
import { ModifyCommentModalContextProvider } from './hooks/use-modify-comment-context'
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  serializeJsonLd,
} from './seo'
import ActiveSection from './sections/active-section'
import ArticleDataSection from './sections/article-data-section'
import CommentSection from './sections/comment-section'
import LikeSection from './sections/like-section'

interface PageProps {
  params: { id: string }
}

const getArticleData = cache(async (id: string): Promise<Article> => {
  const repo = new ArticleRepository()
  try {
    return await repo.getArticle(id)
  } catch (error) {
    if (error instanceof HttpResponseError && error.status === 404) notFound()
    throw error
  }
})

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  return buildArticleMetadata(await getArticleData(id))
}

const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  const data = await getArticleData(id)
  const jsonLd = buildArticleJsonLd(data)

  return (
    <>
      {jsonLd.map((value, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(value) }}
        />
      ))}
      <div className="relative flex flex-col bg-background pb-6 text-foreground">
        <ModifyCommentModalContextProvider>
          <ModifyArticleModalContextProvider>
            <ArticleDataSection data={data} />
            <LikeSection id={id} />
            <CommentSection />
          </ModifyArticleModalContextProvider>
        </ModifyCommentModalContextProvider>
        <ActiveSection id={id} />
      </div>
    </>
  )
}

export default Page
