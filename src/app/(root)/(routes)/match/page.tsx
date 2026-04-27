import { FunctionComponent } from 'react'
import { MatchContainer } from './components/match-container'

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  return (
    <main className="min-h-page bg-dm-bg pb-5 text-dm-text">
      <MatchContainer />
    </main>
  )
}

export default Page
