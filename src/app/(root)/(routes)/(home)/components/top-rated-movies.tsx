import { Poster, paletteForMovie } from '@/components/dm'
import type { Movie } from '@/modules/movie/movie.entity'
import { MovieRepository } from '@/modules/movie/movie-repository'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { selectTopRatedMovies } from './top-rated-movies.presenter'

interface TopRatedMoviesProps {
  excludeMovieIds: number[]
}

function Rating({ movie }: { movie: Movie }) {
  return (
    <div className="mt-1 flex items-center gap-1 text-[11px]">
      <Star aria-hidden className="h-3 w-3 fill-primary text-primary" />
      <strong className="font-mono text-foreground">
        {movie.averageScore?.toFixed(1)}
      </strong>
      <span className="text-muted-foreground">
        {movie.scoreCount?.toLocaleString('ko-KR')}명 평가
      </span>
    </div>
  )
}

export async function TopRatedMovies({ excludeMovieIds }: TopRatedMoviesProps) {
  const result = await new MovieRepository()
    .getTopRatedMovies(12)
    .catch(() => [])
  const movies = selectTopRatedMovies(result, excludeMovieIds, 6)

  if (!movies.length) return null

  return (
    <section className="mt-6 border-t border-border">
      <div className="px-4 pb-3 pt-4">
        <h2 className="text-base font-semibold">볼래 사용자들의 선택</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          실제 사용자 평점이 높은 영화를 모았어요.
        </p>
      </div>
      <div className="overflow-x-auto overscroll-x-contain px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid w-max auto-cols-[132px] grid-flow-col gap-3 sm:auto-cols-[154px]">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="group block min-w-0"
            >
              <Poster
                title={movie.title}
                imageUrl={movie.poster}
                palette={paletteForMovie(movie.id, movie.title)}
                sizes="(max-width: 639px) 132px, 154px"
                rounded="md"
                className="transition-transform duration-200 group-hover:-translate-y-1"
              />
              <h3 className="mt-2 line-clamp-2 min-h-[36px] break-keep text-[14px] font-semibold leading-[18px] group-hover:text-primary">
                {movie.title}
              </h3>
              <Rating movie={movie} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
