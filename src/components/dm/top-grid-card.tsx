import { Movie } from '@/modules/movie/movie.entity'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Poster } from './poster'
import { paletteForMovie } from './poster-palette'

interface TopGridCardProps {
  movie: Movie
  rank: number
}

function formatAudience(n: number | undefined): string | null {
  if (!n || n < 1) return null
  if (n >= 10000) return `${Math.round(n / 10000)}만`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}천`
  return `${n}`
}

export function TopGridCard({ movie, rank }: TopGridCardProps) {
  const palette = paletteForMovie(movie.id, movie.title)
  const rating = movie.averageScore ?? 0
  const rankInten = movie.rankInten ?? 0
  const intenColor =
    rankInten > 0
      ? 'text-[#6fc96f]'
      : rankInten < 0
      ? 'text-dm-red'
      : 'text-dm-text-faint'
  const intenLabel =
    rankInten > 0 ? `▲${rankInten}` : rankInten < 0 ? `▼${-rankInten}` : '—'
  const audience = formatAudience(movie.audience)

  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div className="relative">
        <Poster title={movie.title} palette={palette} imageUrl={movie.poster} />
        <span className="absolute left-0 top-0 border-b border-r border-dm-line bg-dm-bg/[0.85] px-1.5 py-px font-dm-rank text-[15px] leading-[1.1] text-dm-text">
          {String(rank).padStart(2, '0')}
        </span>
        {audience && (
          <span className="absolute bottom-1 right-1 inline-flex items-center gap-0.5 border border-dm-amber/40 bg-black/65 px-1 py-px font-dm-mono text-[9px] tracking-[0.3px] text-dm-amber">
            👥 {audience}
          </span>
        )}
      </div>
      <div className="mt-1 truncate text-[11px] leading-tight text-dm-text">
        {movie.title}
      </div>
      <div className="mt-px flex items-center gap-[3px]">
        <span className="text-[10px] text-dm-amber">★</span>
        <span className="font-dm-mono text-[10px] text-dm-text-muted">
          {rating.toFixed(1)}
        </span>
        <span
          className={cn(
            'ml-auto font-dm-mono text-[9px]',
            intenColor,
          )}
        >
          {intenLabel}
        </span>
      </div>
    </Link>
  )
}
