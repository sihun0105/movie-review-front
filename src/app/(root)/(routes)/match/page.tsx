import { FunctionComponent } from 'react'
import { MatchContainer } from './components/match-container'

interface PageProps {
  searchParams?: {
    movieTitle?: string
  }
}

const Page: FunctionComponent<PageProps> = ({ searchParams }) => {
  const movieTitle = searchParams?.movieTitle?.trim() || undefined

  return (
    <main className="min-h-page bg-background pb-5 text-foreground">
      <MatchContainer movieTitle={movieTitle} />
    </main>
  )
}

export default Page
