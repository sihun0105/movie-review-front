import { AppSkeleton } from '@/components/app/app-skeleton'
import GoogleAd from '@/components/app/googleAd'
import MovieCard from '@/components/app/movie-state-card'
import { Movie } from '@/modules/movie/movie-entity'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { FunctionComponent } from 'react'

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
      <GoogleAd />
    </main>
  )
}

export default Page
