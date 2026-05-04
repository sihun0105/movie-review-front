import { Movie } from '@/modules/movie/movie.entity'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Poster } from './poster'
import { paletteForMovie } from './poster-palette'

interface TopGridCardProps {
  movie: Movie
  rank: number
}

function formatAudienceMan(n: number | undefined): string | null {
  if (!n || n < 1) return null
  if (n >= 10000) return `${Math.round(n / 10000)}만명`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천명`
  return `${n}명`
}

export function TopGridCard({ movie, rank }: TopGridCardProps) {
  const palette = paletteForMovie(movie.id, movie.title)
  const rating = movie.averageScore ?? 0
  const rankInten = movie.rankInten ?? 0
  const intenColor =
    rankInten > 0 ? 'text-green-400' : rankInten < 0 ? 'text-primary' : 'text-muted-foreground'
  const intenLabel =
    rankInten > 0 ? `▲${rankInten}` : rankInten < 0 ? `▼${-rankInten}` : '—'
  const audience = formatAudienceMan(movie.audience)

  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div className="relative">
        <Poster title={movie.title} palette={palette} imageUrl={movie.poster} />
        <span className="absolute left-0 top-0 rounded-br rounded-tl bg-background/80 px-1.5 py-0.5 font-mono text-[12px] font-semibold text-foreground backdrop-blur-sm">
          #{rank}
        </span>
      </div>
      <div className="mt-1.5 truncate text-[12px] font-medium text-foreground">
        {movie.title}
      </div>
      <div className="mt-0.5 flex items-center gap-1">
        <span className="text-[11px] text-yellow-400">★</span>
        <span className="font-mono text-[11px] text-muted-foreground">{rating.toFixed(1)}</span>
        <span className={cn('ml-auto font-mono text-[10px]', intenColor)}>{intenLabel}</span>
      </div>
      {audience && (
        <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">{audience}</div>
      )}
    </Link>
  )
}
