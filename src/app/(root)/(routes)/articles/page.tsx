import { FunctionComponent } from 'react'
import ArticleSection from './components/article-section'
import NewArticleToggle from './components/new-article-toggle'

const Page: FunctionComponent = () => {
  return (
    <div className="relative min-h-page bg-background pb-[100px] text-foreground">
      <div className="flex items-center border-b border-border px-4 py-3.5">
        <h1 className="font-dm-display text-[20px] italic font-bold text-foreground">
          커뮤니티
        </h1>
      </div>
      <ArticleSection />
      <div className="fixed bottom-[72px] right-4 z-50">
        <NewArticleToggle />
      </div>
    </div>
  )
}

export default Page
