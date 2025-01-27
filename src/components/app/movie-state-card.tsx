import { Movie } from '@/modules/movie/movie-entity'
import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { FaCrown } from 'react-icons/fa'

interface MovieCardProps {
  data: Movie
}

const MovieCard: FunctionComponent<MovieCardProps> = ({ data: movie }) => {
  return (
    <Link href={`movie/${movie.id}`}>
      <div className="stats relative w-full overflow-visible shadow-md transition-transform duration-300 hover:scale-105">
        {movie.rank === 1 && (
          <FaCrown className="absolute left-[-10px] top-[-10px] z-10 text-2xl text-yellow-500 transition-transform duration-300" />
        )}
        <div className="stat">
          <section className="relative aspect-square w-full overflow-clip">
            {movie.poster === '' && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">No Image</p>
              </div>
            )}
            <Image
              src={movie.poster}
              alt={movie.title}
              blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              placeholder="blur"
              fill
            />
          </section>
          <div className="stat-title whitespace-normal">{movie.title}</div>
          <div className="stat-value">{movie.audience.toLocaleString()}</div>
          <div className="stat-desc">장르: {movie.genre}</div>
          <div className="stat-desc">감독: {movie.director}</div>
          <div className="stat-desc">
            업데이트 날짜: {new Date(movie.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
