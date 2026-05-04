import { FunctionComponent } from 'react'
import { MatchContainer } from './components/match-container'

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
  return (
    <main className="min-h-page bg-background pb-5 text-foreground">
      <MatchContainer />
    </main>
  )
}

export default Page
