import Link from 'next/link'
import { Movie } from '@/modules/movie/movie.entity'
import { Poster } from '@/components/dm/poster'
import { paletteForMovie } from '@/components/dm/poster-palette'

export function MovieCatalogCard({ movie }: { movie: Movie }) {
  const year = Number.isNaN(movie.openedAt.getTime())
    ? undefined
    : movie.openedAt.getFullYear()
  const genres = movie.genre
    .split(/[,/·]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 2)
  const rating = movie.averageScore ?? 0

  return (
    <Link href={`/movie/${movie.id}`} className="group block min-w-0">
      <article>
        <Poster
          title={movie.title}
          imageUrl={movie.poster}
          palette={paletteForMovie(movie.id, movie.title)}
          sizes="(max-width: 639px) 44vw, 180px"
          rounded="md"
          className="transition-transform duration-200 group-hover:-translate-y-1"
        />
        <h2 className="mt-2 line-clamp-2 min-h-[40px] break-keep text-[15px] font-semibold leading-5 group-hover:text-primary">
          {movie.title}
        </h2>
        <p className="mt-1 truncate text-[11px] text-muted-foreground">
          {[year, ...genres].filter(Boolean).join(' · ')}
        </p>
        <div className="mt-1 flex items-center justify-between gap-2 text-[11px]">
          <span className="truncate text-muted-foreground">
            {movie.director || '감독 정보 없음'}
          </span>
          {rating > 0 && (
            <span className="shrink-0 font-semibold text-primary">
              ★ {rating.toFixed(1)}
            </span>
          )}
        </div>
      </article>
    </Link>
  )
}
