import { Movie } from '@/modules/movie/movie.entity'
import Link from 'next/link'
import { Poster } from './poster'
import { paletteForMovie } from './poster-palette'
import { Stars } from './stars'

interface TopFeaturedCardProps {
  movie: Movie
}

export function TopFeaturedCard({ movie }: TopFeaturedCardProps) {
  const palette = paletteForMovie(movie.id, movie.title)
  const rating = movie.averageScore ?? 0
  const reviews = movie.scoreCount ?? 0
  const audience = movie.audience ?? 0
  const rankInten = movie.rankInten ?? 0
  const genres = movie.genre?.split(/[,/·]/).map((g) => g.trim()).filter(Boolean) ?? []
  const year = movie.openedAt ? new Date(movie.openedAt).getFullYear() : undefined

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="mx-4 mb-3 flex cursor-pointer gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent"
    >
      <div className="relative w-[100px] shrink-0">
        <Poster title={movie.title} palette={palette} imageUrl={movie.poster} />
        <span className="absolute left-0 top-0 rounded-br rounded-tl bg-primary px-2 py-0.5 font-mono text-[11px] font-bold text-primary-foreground">
          #1
        </span>
      </div>
      <div className="flex min-w-0 flex-col justify-between py-0.5">
        <div>
          <div className="font-mono text-[11px] text-muted-foreground">
            {[...genres.slice(0, 2), year].filter(Boolean).join(' · ')}
          </div>
          <div className="mt-1.5 text-[20px] font-bold leading-tight tracking-tight text-foreground">
            {movie.title}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <Stars value={rating} size={12} />
            <span className="text-[16px] font-bold text-foreground">{rating.toFixed(1)}</span>
            <span className="text-[11px] text-muted-foreground">· 리뷰 {reviews.toLocaleString()}</span>
          </div>
          {audience > 0 && (
            <div className="mt-1 font-mono text-[11px] text-muted-foreground">
              👥 {(audience / 10000).toFixed(0)}만명
              {rankInten !== 0 && (
                <span className={rankInten > 0 ? ' ml-2 text-green-400' : ' ml-2 text-primary'}>
                  {rankInten > 0 ? `▲${rankInten}` : `▼${-rankInten}`}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
