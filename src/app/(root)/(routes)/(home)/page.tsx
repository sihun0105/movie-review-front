import { AppSkeleton } from '@/components/app/app-skeleton'
// import GoogleAd from '@/components/app/googleAd'
import MovieCard from '@/components/app/movie-state-card'
import { Movie } from '@/modules/movie/movie-entity'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { Metadata } from 'next'
import { FunctionComponent } from 'react'

export const metadata: Metadata = {
  title: '영화 뭐함? 최신 영화 추천과 리뷰 | 영화뭐함',
  description:
    '영화 뭐함? 고민되시나요? 영화뭐함에서 최신 인기 영화, 평점, 리뷰를 확인하고 완벽한 영화를 찾아보세요. 어떤 영화를 볼지 모르겠다면 지금 바로 확인해보세요!',
  keywords:
    '영화 뭐함, 영화뭐함, 영화 추천, 최신 영화, 인기 영화, 영화 순위, 영화 평점, 영화 리뷰, 볼만한 영화, 어떤 영화',
  openGraph: {
    title: '영화 뭐함? 최신 영화 추천과 리뷰 | 영화뭐함',
    description:
      '영화 뭐함? 고민되시나요? 영화뭐함에서 최신 인기 영화, 평점, 리뷰를 확인하고 완벽한 영화를 찾아보세요.',
  },
}

interface PageProps {}

const getMovieList = async (): Promise<Movie[]> => {
  const repo = new MovieRepository()
  const result = await repo.getMovie()
  return result
}

const Page: FunctionComponent<PageProps> = async ({}) => {
  const data = await getMovieList()
  if (!data) return <AppSkeleton className="container min-h-[364px] p-6" />

  return (
    <main>
      <section className="container flex flex-col gap-4 p-6">
        {data.map((movie, index) => (
          <div key={movie.id} className="relative">
            <MovieCard data={{ ...movie, rank: index + 1 }} />
          </div>
        ))}
      </section>
      {/* <GoogleAd /> */}
    </main>
  )
}

export default Page
