'use client'

import { FunctionComponent } from 'react'
import ArticleSection from './components/article-section'
import NewArticleToggle from './components/new-article-toggle'
const Page: FunctionComponent = () => {
  return (
    <>
      <main className="container relative mx-auto min-h-screen max-w-[460px]">
        <h1 className="mb-4 text-2xl font-bold">영화 커뮤니티 게시판</h1>
        <ArticleSection />
        <div className="sticky bottom-24 z-50 flex justify-end px-6">
          <NewArticleToggle>글쓰기</NewArticleToggle>
        </div>
      </main>
    </>
  )
}

export default Page
