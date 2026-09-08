import { Metadata } from 'next'
import { FunctionComponent, cache } from 'react'
import Link from 'next/link'
import ArticleSection from './components/article-section'
import { ArticleRepository } from '@/modules/article/article-repository'
import { articlePageHref, articlePageNumber } from '@/lib/seo/public-discovery'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams?: { page?: string }
}

const getArticlePage = cache(async (page: number) => {
  const data = await new ArticleRepository().listArticles(page)
  if (page > 1 && data.articles.length === 0) notFound()
  return data
})

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const page = articlePageNumber(searchParams?.page)
  await getArticlePage(page)
  const canonical = `https://bollae.kr${articlePageHref(page)}`
  return {
    title: '커뮤니티 | 볼래',
    description:
      '볼래 커뮤니티에서 영화 후기, 추천, 같이 보고 싶은 영화 이야기를 나눠보세요.',
    alternates: {
      canonical,
    },
    openGraph: {
      title: '커뮤니티 | 볼래',
      description:
        '볼래 커뮤니티에서 영화 후기, 추천, 같이 보고 싶은 영화 이야기를 나눠보세요.',
      url: canonical,
      type: 'website',
    },
    twitter: {
      title: '커뮤니티 | 볼래',
      description:
        '볼래 커뮤니티에서 영화 후기, 추천, 같이 보고 싶은 영화 이야기를 나눠보세요.',
    },
  }
}

const Page: FunctionComponent<PageProps> = async ({ searchParams }) => {
  const page = articlePageNumber(searchParams?.page)
  const initialData = await getArticlePage(page)
  return (
    <main className="min-h-page bg-background pb-5 text-foreground">
      <div className="flex items-center border-b border-border px-4 py-3.5">
        <h1 className="text-[18px] font-bold tracking-tight text-foreground">
          커뮤니티
        </h1>
        <Link
          href="/articles/new"
          className="ml-auto inline-flex h-8 items-center rounded-md bg-primary px-3 text-[13px] font-medium text-primary-foreground"
        >
          ＋ 만들기
        </Link>
      </div>
      <ArticleSection key={page} initialData={initialData} startPage={page} />
      <nav
        aria-label="게시글 페이지"
        className="flex justify-between border-t border-border px-4 py-4 text-sm"
      >
        {page > 1 ? (
          <Link href={articlePageHref(page - 1)}>이전 페이지</Link>
        ) : (
          <span />
        )}
        {initialData.hasNext && (
          <Link href={articlePageHref(page + 1)}>다음 페이지</Link>
        )}
      </nav>
    </main>
  )
}

export default Page
