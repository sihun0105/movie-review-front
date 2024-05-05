import Box from '@/components/ui/box'
import { Movie } from '@/modules/movie/movie-entity'
import Link from 'next/link'
import { FunctionComponent } from 'react'
interface MovieCardProps {
  data: Movie
}

const MovieCard: FunctionComponent<MovieCardProps> = ({ data: movie }) => {
  return (
    <Link href={`movie/${movie.id}`}>
      <Box
        shadow={'none'}
        className="m-4 flex flex-col rounded-md bg-white p-4 shadow-md"
      >
        <h2 className="mb-2 text-2xl font-bold">{movie.title}</h2>
        <span className="text-sm text-gray-500">
          관객수: {movie.audience.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500">
          업데이트 날짜: {new Date(movie.updatedAt).toLocaleDateString()}
        </span>
      </Box>
    </Link>
  )
}

export default MovieCard
