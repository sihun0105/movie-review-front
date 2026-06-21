import { Metadata } from 'next'
import { FunctionComponent } from 'react'
import { NewMatchContainer } from './components/new-match-container'

export const metadata: Metadata = {
  title: '매치 만들기 | 볼래',
  description: '볼래에서 함께 볼 영화 약속을 직접 만들어보세요.',
  alternates: {
    canonical: 'https://bollae.kr/match/new',
  },
  openGraph: {
    title: '매치 만들기 | 볼래',
    description: '볼래에서 함께 볼 영화 약속을 직접 만들어보세요.',
    url: 'https://bollae.kr/match/new',
  },
  robots: {
    index: false,
    follow: false,
  },
}

interface PageProps {
  searchParams?: {
    movieTitle?: string
  }
}

const Page: FunctionComponent<PageProps> = ({ searchParams }) => {
  const movieTitle = searchParams?.movieTitle?.trim() || undefined

  return (
    <div className="min-h-page bg-background px-5 py-5 text-foreground">
      <NewMatchContainer movieTitle={movieTitle} />
    </div>
  )
}

export default Page
