import { MovieRepository } from '@/modules/movie/movie-repository'
import { FunctionComponent } from 'react'
interface PageProps {}
const getMovieTheaterList = async (): Promise<CGVTheaterList> => {
  const repo = new MovieRepository()
  return repo.getMovieTheaterList()
}
export interface CGVTheaterList {
  theaters: CGVTheater[]
}
export interface CGVTheater {
  id: number
  name: string
  region: string
  address: string
  phone: string
  website: string
  latitude: number
  longitude: number
  createdAt: string
  updatedAt: string
}
const Page: FunctionComponent<PageProps> = async ({}) => {
  const data = await getMovieTheaterList()
  console.log('Movie Theater List:', data)
  return <main>Page</main>
}

export default Page
