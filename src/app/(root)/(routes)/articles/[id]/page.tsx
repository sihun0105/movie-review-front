import { Article } from '@/lib/type'
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
  return repo.getArticle(id)
})

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  try {
    return buildArticleMetadata(await getArticleData(id))
  } catch {
    return {
      title: '영화 이야기 | 볼래',
      description: '볼래 영화 커뮤니티의 영화 이야기입니다.',
      robots: { index: false, follow: false },
    }
  }
}

const Page: FunctionComponent<PageProps> = async ({ params: { id } }) => {
  const data = await getArticleData(id).catch(() => notFound())
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
      <div className="relative flex flex-col bg-background pb-[140px] lg:pb-6 text-foreground">
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
