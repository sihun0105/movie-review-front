import { AppSkeleton } from '@/components/app/app-skeleton'
import GoogleAd from '@/components/app/googleAd'
import {
  MatchHeroBanner,
  TopFeaturedCard,
  TopGridCard,
} from '@/components/dm'
import { Movie } from '@/modules/movie/movie.entity'
import { MovieRepository } from '@/modules/movie/movie-repository'
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

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMovieList()
  const topRated =
    data
      ?.filter((m) => m.averageScore && m.averageScore > 0)
      ?.slice(0, 9)
      ?.map((m) => `${m.title} (평점 ${m.averageScore?.toFixed(1)})`)
      ?.join(', ') || ''

  const description = topRated
    ? `영화 뭐함? 고민되시나요? 영화뭐함에서 최신 인기 영화, 평점, 리뷰를 확인하고 완벽한 영화를 찾아보세요. 인기 영화: ${topRated}. 어떤 영화를 볼지 모르겠다면 지금 바로 확인해보세요!`
    : '영화 뭐함? 고민되시나요? 영화뭐함에서 최신 인기 영화, 평점, 리뷰를 확인하고 완벽한 영화를 찾아보세요. 어떤 영화를 볼지 모르겠다면 지금 바로 확인해보세요!'

  return {
    title: '영화 뭐함? 최신 영화 추천과 리뷰 | 영화뭐함',
    description,
    keywords:
      '영화 뭐함, 영화뭐함, 영화 추천, 최신 영화, 인기 영화, 영화 순위, 영화 평점, 영화 리뷰, 볼만한 영화, 어떤 영화',
    openGraph: {
      title: '영화 뭐함? 최신 영화 추천과 리뷰 | 영화뭐함',
      description,
    },
  }
}

const TODAY_LABEL = (() => {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `TONIGHT · ${m}.${day}`
})()

const Page: FunctionComponent = async () => {
  const data = await getMovieList()

  if (!data || data.length === 0) {
    return <AppSkeleton className="container min-h-[364px] p-6" />
  }

  const sorted = [...data].sort(
    (a, b) => (a.rank ?? 999) - (b.rank ?? 999),
  )
  const top10 = sorted.slice(0, 10)
  const featured = top10[0]
  const grid = top10.slice(1)

  return (
    <main className="pb-5">
      <MatchHeroBanner todayLabel={TODAY_LABEL} liveCount={24} nearbyCount={7} />

      <div className="flex items-center gap-2 px-4 pb-2 pt-5">
        <h2 className="text-[16px] font-semibold text-foreground">박스오피스</h2>
        <span className="font-mono text-[11px] text-muted-foreground">KOFIC · TOP 10</span>
      </div>

      {featured && <TopFeaturedCard movie={featured} />}

      <div className="mx-4 mb-4 grid grid-cols-3 gap-3 md:grid-cols-4">
        {grid.map((movie, i) => (
          <TopGridCard key={movie.id} movie={movie} rank={i + 2} />
        ))}
      </div>

      <GoogleAd />
    </main>
  )
}

export default Page
