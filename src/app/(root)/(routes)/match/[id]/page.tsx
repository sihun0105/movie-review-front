import { FunctionComponent, cache } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MatchPostRepository } from '@/modules/match/match-post-repository'
import { MatchDetailContainer } from './components/match-detail-container'

interface PageProps {
  params: { id: string }
}

const getMatch = cache(async (id: string) => {
  const { matchPost } = await new MatchPostRepository().getMatchPost(id)
  if (!matchPost) notFound()
  return matchPost
})

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const match = await getMatch(params.id)
  const title = `${match.title} | 볼래 매칭`
  const description =
    `${match.movieTitle} 같이 보기 · ${match.location}. ${match.content}`.slice(
      0,
      160,
    )
  const url = `https://bollae.kr/match/${params.id}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
  }
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
  return <MatchDetailContainer initialMatch={await getMatch(params.id)} />
}

export default Page
