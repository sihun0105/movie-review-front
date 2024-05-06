import { Movie } from '@/modules/movie/movie-entity'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { FunctionComponent } from 'react'
import MovieCard from '@/components/app/movie-state-card'
interface PageProps {}

const getMovieList = async (): Promise<Movie[]> => {
  const repo = new MovieRepository()
  const result = await repo.getMovie()
  return result
}
const Page: FunctionComponent<PageProps> = async ({}) => {
  const data = await getMovieList()
  if (!data) return <div>loading...</div>
  return (
    <main>
      <section className="container flex flex-col gap-4 p-6">
        {data.map((movie) => (
          <MovieCard key={movie.id} data={movie} />
        ))}
      </section>
    </main>
  )
}

export default Page
