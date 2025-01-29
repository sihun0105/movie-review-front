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
      <div className="stats relative w-full overflow-visible rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-gray-800">
        {movie.rank === 1 && (
          <FaCrown className="absolute left-[-10px] top-[-10px] z-10 text-3xl text-yellow-500 transition-transform duration-300" />
        )}
        <div className="stat p-4">
          <section className="relative aspect-square w-full overflow-hidden rounded-t-lg">
            {movie.poster === '' && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                <p className="text-gray-500 dark:text-gray-300">No Image</p>
              </div>
            )}
            <Image
              src={movie.poster}
              alt={movie.title}
              blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              placeholder="blur"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-2 left-2 text-5xl font-bold text-gray-300 dark:text-gray-300">
              {movie.rank}
            </div>
          </section>
          <section className="mt-4 text-black dark:text-white">
            <div className="stat-title whitespace-normal text-lg font-semibold dark:text-white">
              {movie.title}
            </div>
            <div className="stat-value text-xl font-bold dark:text-white">
              {movie.audience.toLocaleString()}
            </div>
            <div className="stat-desc mt-2 dark:text-white">
              장르: {movie.genre}
            </div>
            <div className="stat-desc dark:text-white">
              감독: {movie.director}
            </div>
            <div className="stat-desc dark:text-white">
              업데이트 날짜: {new Date(movie.updatedAt).toLocaleDateString()}
            </div>
          </section>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
