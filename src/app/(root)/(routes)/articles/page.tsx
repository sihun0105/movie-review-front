import { FunctionComponent } from 'react'
import Link from 'next/link'
import ArticleSection from './components/article-section'

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
