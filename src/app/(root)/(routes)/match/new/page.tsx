import { FunctionComponent } from 'react'
import { NewMatchContainer } from './components/new-match-container'

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">영화 메이트 모집하기</h1>
        <p className="text-gray-600">함께 영화를 볼 메이트를 모집해보세요!</p>
      </div>

      <NewMatchContainer />
    </main>
  )
}

export default Page
