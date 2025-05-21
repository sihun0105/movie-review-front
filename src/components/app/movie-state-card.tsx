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
      <div className="stats relative w-full overflow-visible rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105 ">
        {movie.rank === 1 && (
          <FaCrown className="absolute left-[-10px] top-[-10px] z-10 text-3xl text-yellow-500 transition-transform duration-300" />
        )}
        <div className="stat p-4">
          <section className="relative aspect-square w-full overflow-hidden rounded-t-lg">
            {movie.poster === '' && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 ">
                <p className="text-gray-500 ">No Image</p>
              </div>
            )}
            <Image
              src={movie.poster}
              alt={`${movie.title} 포스터`}
              blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              placeholder="blur"
              fill
              style={{ objectFit: 'contain' }}
            />
            <div className="absolute bottom-2 left-2 text-5xl font-bold text-gray-300">
              {movie.rank}
            </div>
          </section>
          <section className="mt-4 text-black ">
            <h1 className="stat-title whitespace-normal text-lg font-semibold ">
              {movie.title}
            </h1>
            <div className="stat-value text-xl font-bold ">
              {movie.audience.toLocaleString()}
            </div>
            <div className="stat-desc mt-2 ">장르: {movie.genre}</div>
            <div className="stat-desc ">감독: {movie.director}</div>
            <div className="stat-desc ">
              영화개봉 날짜: {new Date(movie.openedAt).toLocaleDateString()}
            </div>
          </section>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
