import { FunctionComponent } from 'react'
interface PageProps {}

const Page: FunctionComponent<PageProps> = ({}) => {
  return <main>Page</main>
}

export default Page
// import { MovieRepository } from '@/modules/movie/movie-repository'
// import { FunctionComponent } from 'react'
// interface PageProps {}
// const getMovieTheaterList = async (): Promise<CGVTheaterList> => {
//   const repo = new MovieRepository()
//   return repo.getMovieTheaterList()
// }

// const Page: FunctionComponent<PageProps> = async ({}) => {
//   const data = await getMovieTheaterList()
//   console.log('Movie Theater List:', data)
//   return <main>Page</main>
// }

// export default Page
