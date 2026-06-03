import { FunctionComponent } from 'react'
import { NewMatchContainer } from './components/new-match-container'

interface PageProps {
  searchParams?: {
    movieTitle?: string
  }
}

const Page: FunctionComponent<PageProps> = ({ searchParams }) => {
  const movieTitle = searchParams?.movieTitle?.trim() || undefined

  return (
    <div className="min-h-page bg-background text-foreground">
      <div className="flex items-center border-b border-border px-4 py-3.5">
        <h1 className="font-dm-display text-[20px] italic font-bold text-foreground">
          매치 만들기
        </h1>
      </div>
      <div className="px-5 py-5">
        <NewMatchContainer movieTitle={movieTitle} />
      </div>
    </div>
  )
}

export default Page
