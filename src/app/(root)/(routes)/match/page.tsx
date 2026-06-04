import { Metadata } from 'next'
import { FunctionComponent } from 'react'
import { MatchContainer } from './components/match-container'

export const dynamic = 'force-dynamic'

const SITE_URL = 'https://bollae.kr'

interface PageProps {
  searchParams?: {
    movieTitle?: string
  }
}

function withObjectParticle(text: string) {
  const lastChar = text.charCodeAt(text.length - 1)
  const hasFinalConsonant = lastChar >= 0xac00 && lastChar <= 0xd7a3 && (lastChar - 0xac00) % 28 > 0

  return `${text}${hasFinalConsonant ? '을' : '를'}`
}

export function generateMetadata({ searchParams }: PageProps): Metadata {
  const movieTitle = searchParams?.movieTitle?.trim()
  const title = movieTitle ? `${movieTitle} 같이 볼 사람 찾기 | 볼래` : '매칭 | 볼래'
  const description = movieTitle
    ? `볼래에서 ${withObjectParticle(movieTitle)} 함께 볼 영화 친구와 매칭 약속을 찾아보세요.`
    : '볼래에서 오늘 같이 볼 사람을 찾고 영화 약속을 만들어보세요.'
  const canonical = movieTitle ? `${SITE_URL}/match?movieTitle=${encodeURIComponent(movieTitle)}` : `${SITE_URL}/match`

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
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
