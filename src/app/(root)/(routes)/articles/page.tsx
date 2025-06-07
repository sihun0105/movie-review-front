'use client'

import { FunctionComponent } from 'react'
import ArticleSection from './components/article-section'
import NewArticleToggle from './components/new-article-toggle'
const Page: FunctionComponent = () => {
  return (
    <>
      <main className="container relative max-w-[460px] space-y-4 p-4 ">
        <h1 className="mb-4 text-2xl font-bold">영화 커뮤니티 게시판</h1>
        <ArticleSection />

        <NewArticleToggle className="absolute bottom-0 right-6">
          글쓰기
        </NewArticleToggle>
      </main>
    </>
  )
}

export default Page
