import Image from 'next/image'
import { FunctionComponent } from 'react'
import MovieScore from './movie-score'

interface MovieProps {
  movie: {
    id: number
    audience: number
    title: string
    poster: string
    plot: string
    openedAt: string
    genre: string
    director: string
    ratting: string
  }
}

const MovieDetail: FunctionComponent<MovieProps> = ({ movie }) => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* 배경 포스터 */}
      <div className="absolute inset-0 h-full w-full overflow-hidden opacity-50">
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover blur-lg"
          priority
        />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 p-10 md:flex-row">
        {/* 포스터 */}
        <div className="relative h-96 w-64 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>

        {/* 영화 정보 */}
        <div className="flex max-w-2xl flex-col gap-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-300">
            {movie.genre} · {movie.ratting} ·{' '}
            {new Date(movie.openedAt).getFullYear()}
          </p>
          <p className="text-lg leading-relaxed text-gray-200">{movie.plot}</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span>감독: {movie.director}</span>
            <span>관객수: {movie.audience.toLocaleString()}명</span>
          </div>

          <MovieScore movieCd={movie.id} />
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
