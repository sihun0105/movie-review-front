import { Metadata } from 'next'
import { FunctionComponent } from 'react'
import { MatchContainer } from './components/match-container'

export const metadata: Metadata = {
  title: '매칭 | 볼래',
  description: '볼래에서 오늘 같이 볼 사람을 찾고 영화 약속을 만들어보세요.',
  alternates: {
    canonical: 'https://bollae.kr/match',
  },
  openGraph: {
    title: '매칭 | 볼래',
    description: '볼래에서 오늘 같이 볼 사람을 찾고 영화 약속을 만들어보세요.',
    url: 'https://bollae.kr/match',
    type: 'website',
  },
  twitter: {
    title: '매칭 | 볼래',
    description: '볼래에서 오늘 같이 볼 사람을 찾고 영화 약속을 만들어보세요.',
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
    <main className="min-h-page bg-background pb-5 text-foreground">
      <MatchContainer movieTitle={movieTitle} />
    </main>
  )
}

export default Page
