import { Metadata } from 'next'
import { FunctionComponent } from 'react'
import Link from 'next/link'
import ArticleSection from './components/article-section'

export const metadata: Metadata = {
  title: '커뮤니티 | 볼래',
  description:
    '볼래 커뮤니티에서 영화 후기, 추천, 같이 보고 싶은 영화 이야기를 나눠보세요.',
  alternates: {
    canonical: 'https://bollae.kr/articles',
  },
  openGraph: {
    title: '커뮤니티 | 볼래',
    description:
      '볼래 커뮤니티에서 영화 후기, 추천, 같이 보고 싶은 영화 이야기를 나눠보세요.',
    url: 'https://bollae.kr/articles',
    type: 'website',
  },
  twitter: {
    title: '커뮤니티 | 볼래',
    description:
      '볼래 커뮤니티에서 영화 후기, 추천, 같이 보고 싶은 영화 이야기를 나눠보세요.',
  },
}

const Page: FunctionComponent = () => {
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
      <ArticleSection />
    </main>
  )
}

export default Page
