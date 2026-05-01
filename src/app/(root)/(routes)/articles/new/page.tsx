import { FunctionComponent } from 'react'
import { CreateArticleFormProvider } from './hooks/create-article-form-context'
import { CreateArticleForm } from './components/create-article-form'

const Page: FunctionComponent = () => {
  return (
    <div className="min-h-page bg-dm-bg text-dm-text">
      <div className="flex items-center border-b border-dm-line px-4 py-3.5">
        <h1 className="font-dm-display text-[20px] italic font-bold text-dm-text">
          새 글 작성
        </h1>
      </div>
      <div className="px-5 py-5">
        <CreateArticleFormProvider>
          <CreateArticleForm />
        </CreateArticleFormProvider>
      </div>
    </div>
  )
}

export default Page
