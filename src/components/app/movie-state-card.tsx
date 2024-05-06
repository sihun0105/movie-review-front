import { Movie } from '@/modules/movie/movie-entity'
import Link from 'next/link'
import { FunctionComponent } from 'react'
interface MovieCardProps {
  data: Movie
}

const MovieCard: FunctionComponent<MovieCardProps> = ({ data: movie }) => {
  return (
    <Link href={`movie/${movie.id}`}>
      <div className="stats w-full overflow-hidden shadow-md">
        <div className="stat">
          <div className="stat-title whitespace-normal">{movie.title}</div>
          <div className="stat-value">{movie.audience.toLocaleString()}</div>
          <div className="stat-desc">
            업데이트 날짜: {new Date(movie.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
