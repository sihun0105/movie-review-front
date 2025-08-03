import { FunctionComponent } from 'react'
import { MatchContainer } from './components/match-container'

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <MatchContainer />
    </main>
  )
}

export default Page
