import { Movie } from '@/modules/movie/movie.entity'
import Link from 'next/link'
import { Poster } from './poster'
import { paletteForMovie } from './poster-palette'

interface MovieListCardProps {
  movie: Movie
}

export function MovieListCard({ movie }: MovieListCardProps) {
  const palette = paletteForMovie(movie.id, movie.title)
  const rating = movie.averageScore ?? 0
  const rankInten = movie.rankInten ?? 0
  const audience = movie.audience ?? 0
  const genres = movie.genre?.split(/[,/·]/).map((g) => g.trim()).filter(Boolean) ?? []

  const intenColor =
    rankInten > 0 ? 'text-green-400' : rankInten < 0 ? 'text-primary' : 'text-muted-foreground'
  const intenLabel =
    rankInten > 0 ? `▲${rankInten}` : rankInten < 0 ? `▼${-rankInten}` : '—'

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="flex cursor-pointer gap-3 rounded-lg border border-border bg-card p-2.5 transition-colors hover:bg-accent">
        {/* 포스터 */}
        <div className="w-[60px] shrink-0">
          <Poster title={movie.title} palette={palette} imageUrl={movie.poster} />
        </div>

        {/* 정보 */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 font-mono text-[10px] font-medium text-primary-foreground">
                #{movie.rank}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {genres.slice(0, 2).join(' · ')}
              </span>
            </div>
            <div className="mt-1.5 truncate text-[14px] font-semibold text-foreground">
              {movie.title}
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-[11px] text-muted-foreground">
            <span>
              ★ <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
            </span>
            {audience > 0 && (
              <span>{(audience / 10000).toFixed(0)}만명</span>
            )}
            <span className={`ml-auto font-mono ${intenColor}`}>{intenLabel}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
