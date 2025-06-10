import { FunctionComponent } from 'react'
import { CreateArticleFormProvider } from './hooks/create-article-form-context'
import { CreateArticleForm } from './components/create-article-form'
interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  return (
    <>
      <main className="container mx-auto max-w-xl px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">✍️ 글 작성</h1>
        <CreateArticleFormProvider>
          <CreateArticleForm />
        </CreateArticleFormProvider>
      </main>
    </>
  )
}

export default Page
