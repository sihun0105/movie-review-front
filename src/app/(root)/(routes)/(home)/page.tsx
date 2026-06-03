import { AppSkeleton } from '@/components/app/app-skeleton'
import GoogleAd from '@/components/app/googleAd'
import { MatchHeroBanner, MovieListCard } from '@/components/dm'
import { Movie } from '@/modules/movie/movie.entity'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { MatchPostRepository } from '@/modules/match/match-post-repository'
import { Metadata } from 'next'
import { FunctionComponent } from 'react'

export const dynamic = 'force-dynamic'

const getMovieList = async (): Promise<Movie[]> => {
  try {
    const repo = new MovieRepository()
    return await repo.getMovie()
  } catch {
    return []
  }
}

const getMatchLiveCount = async (): Promise<number> => {
  try {
    const repo = new MatchPostRepository()
    const data = await repo.getMatchPosts(1, 100)
    return data.matchPosts.filter(
      (m) => m.currentParticipants < m.maxParticipants,
    ).length
  } catch {
    return 0
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMovieList()
  const topRated =
    data
      ?.filter((m) => m.averageScore && m.averageScore > 0)
      ?.slice(0, 9)
      ?.map((m) => `${m.title} (평점 ${m.averageScore?.toFixed(1)})`)
      ?.join(', ') || ''

  const description = topRated
    ? `볼래에서 오늘 같이 볼 사람을 찾고 최신 인기 영화, 평점, 리뷰를 확인하세요. 인기 영화: ${topRated}.`
    : '볼래에서 오늘 같이 볼 사람을 찾고 최신 인기 영화, 평점, 리뷰를 확인하세요.'

  return {
    title: '볼래 | 같이 볼 사람을 찾는 영화 매칭',
    description,
    keywords: '볼래, bollae, 영화 매칭, 같이 볼래, 영화 추천, 최신 영화, 인기 영화, 영화 순위, 영화 평점, 영화 리뷰, 볼만한 영화',
    openGraph: { title: '볼래 | 같이 볼 사람을 찾는 영화 매칭', description },
  }
}

const TODAY_LABEL = (() => {
  const d = new Date()
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return `${days[d.getDay()]} · ${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
})()

const Page: FunctionComponent = async () => {
  const [data, liveCount] = await Promise.all([getMovieList(), getMatchLiveCount()])

  if (!data || data.length === 0) {
    return <AppSkeleton className="container min-h-[364px] p-6" />
  }

  const sorted = [...data].sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
  const top10 = sorted.slice(0, 10)

  return (
    <main className="pb-5">
      <MatchHeroBanner todayLabel={TODAY_LABEL} liveCount={liveCount || undefined} />

      <div className="flex items-center gap-2 px-4 pb-3 pt-5">
        <h2 className="text-[16px] font-semibold text-foreground">박스오피스</h2>
        <span className="font-mono text-[10px] text-muted-foreground">KOFIC · TOP 10</span>
      </div>

      <div className="flex flex-col gap-2 px-4">
        {top10.map((movie) => (
          <MovieListCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="mt-4">
        <GoogleAd />
      </div>
    </main>
  )
}

export default Page
