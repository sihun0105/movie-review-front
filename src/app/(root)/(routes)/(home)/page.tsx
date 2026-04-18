import { AppSkeleton } from '@/components/app/app-skeleton'
import GoogleAd from '@/components/app/googleAd'
import MovieCard from '@/components/app/movie-state-card'
import { MatchBanner } from '@/components/app/match-banner'
import { Movie } from '@/modules/movie/movie-entity'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { getCurrentUser } from '@/lib/utils/server-utils'
import { Metadata } from 'next'
import { FunctionComponent } from 'react'

const getMovieList = async (): Promise<Movie[]> => {
  const repo = new MovieRepository()
  const result = await repo.getMovie()
  return result
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMovieList()

  // 평균 점수가 있는 상위 3개 영화 정보
  const topRatedMovies =
    data
      ?.filter((movie) => movie.averageScore && movie.averageScore > 0)
      ?.slice(0, 9)
      ?.map(
        (movie) => `${movie.title} (평점 ${movie.averageScore?.toFixed(1)})`,
      )
      ?.join(', ') || ''

  const dynamicDescription = topRatedMovies
    ? `영화 뭐함? 고민되시나요? 영화뭐함에서 최신 인기 영화, 평점, 리뷰를 확인하고 완벽한 영화를 찾아보세요. 인기 영화: ${topRatedMovies}. 어떤 영화를 볼지 모르겠다면 지금 바로 확인해보세요!`
    : '영화 뭐함? 고민되시나요? 영화뭐함에서 최신 인기 영화, 평점, 리뷰를 확인하고 완벽한 영화를 찾아보세요. 어떤 영화를 볼지 모르겠다면 지금 바로 확인해보세요!'

  return {
    title: '영화 뭐함? 최신 영화 추천과 리뷰 | 영화뭐함',
    description: dynamicDescription,
    keywords:
      '영화 뭐함, 영화뭐함, 영화 추천, 최신 영화, 인기 영화, 영화 순위, 영화 평점, 영화 리뷰, 볼만한 영화, 어떤 영화',
    openGraph: {
      title: '영화 뭐함? 최신 영화 추천과 리뷰 | 영화뭐함',
      description: dynamicDescription,
    },
  }
}

interface PageProps {}

const Page: FunctionComponent<PageProps> = async ({}) => {
  const data = await getMovieList()
  const user = await getCurrentUser()
  const isAuthenticated = !!user

  console.log(data)
  if (!data) return <AppSkeleton className="container min-h-[364px] p-6" />

  return (
    <main>
      <section className="container flex flex-col gap-4 p-6">
        <MatchBanner isAuthenticated={isAuthenticated} />
        {data.map((movie, index) => (
          <div key={movie.id} className="relative">
            <MovieCard data={{ ...movie, rank: index + 1 }} />
          </div>
        ))}
      </section>
      <GoogleAd />
    </main>
  )
}

export default Page
