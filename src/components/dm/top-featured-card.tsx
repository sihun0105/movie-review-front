import { Movie } from '@/modules/movie/movie.entity'
import Link from 'next/link'
import { Pill } from './pill'
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
  const year = movie.openedAt
    ? new Date(movie.openedAt).getFullYear()
    : undefined

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="mx-4 mb-2.5 grid cursor-pointer grid-cols-[110px_1fr] gap-3 border border-dm-line bg-dm-surface p-2.5"
    >
      <div className="relative">
        <Poster title={movie.title} palette={palette} imageUrl={movie.poster} />
        <span className="absolute left-0 top-0 bg-dm-red px-2 py-0.5 font-dm-rank text-[22px] leading-none text-white">
          01
        </span>
        <span className="absolute right-1.5 top-1.5 border border-dm-amber/30 bg-black/70 px-1.5 py-0.5 font-dm-mono text-[9px] tracking-[0.5px] text-dm-amber">
          🔥 HOT
        </span>
      </div>
      <div className="flex flex-col justify-between pb-1">
        <div>
          <div className="font-dm-mono text-[10px] uppercase tracking-[0.8px] text-dm-text-muted">
            {[...genres.slice(0, 2), year].filter(Boolean).join(' · ')}
          </div>
          <div className="mt-1 font-dm-display text-[24px] italic leading-[1.1] text-dm-text">
            {movie.title}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <Stars value={rating} size={11} />
            <span className="font-dm-rank text-[18px] leading-none text-dm-amber">
              {rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-dm-text-faint">
              · 리뷰 {reviews.toLocaleString()}
            </span>
          </div>
          <div className="mt-1.5 flex gap-1">
            {rankInten !== 0 && (
              <Pill>
                {rankInten > 0 ? `▲ ${rankInten}` : `▼ ${-rankInten}`}
              </Pill>
            )}
            {audience > 0 && <Pill>{(audience / 10000).toFixed(0)}만명</Pill>}
          </div>
        </div>
      </div>
    </Link>
  )
}
