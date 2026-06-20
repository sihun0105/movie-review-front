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
  const hasRating = rating > 0
  const rankInten = movie.rankInten ?? 0
  const audience = movie.audience ?? 0
  const genres =
    movie.genre
      ?.split(/[,/·]/)
      .map((g) => g.trim())
      .filter(Boolean) ?? []
  const director = movie.director?.trim()
  const contentRating = movie.ratting?.trim()

  const intenColor =
    rankInten > 0
      ? 'text-green-400'
      : rankInten < 0
        ? 'text-primary'
        : 'text-muted-foreground'
  const intenLabel =
    rankInten > 0 ? `▲${rankInten}` : rankInten < 0 ? `▼${-rankInten}` : '—'

  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <article className="group grid grid-cols-[104px_minmax(0,1fr)] gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent sm:grid-cols-[124px_minmax(0,1fr)]">
        <div className="relative">
          <Poster
            title={movie.title}
            palette={palette}
            imageUrl={movie.poster}
            className="shadow-[0_12px_32px_rgba(0,0,0,0.28)]"
            rounded="md"
          />
          <span className="min-w-7 absolute left-2 top-2 inline-flex h-7 items-center justify-center rounded-full bg-primary px-2 font-mono text-[11px] font-semibold text-primary-foreground shadow">
            {movie.rank}
          </span>
        </div>

        <div className="flex min-w-0 flex-col justify-between py-0.5">
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              {genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {genre}
                </span>
              ))}
              {movie.rankOldAndNew === 'NEW' && (
                <span className="rounded-full bg-foreground px-2 py-0.5 font-mono text-[10px] text-background">
                  NEW
                </span>
              )}
              {contentRating && (
                <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {contentRating}
                </span>
              )}
            </div>

            <h3 className="mt-2 line-clamp-2 break-keep text-[19px] font-bold leading-tight text-foreground group-hover:text-primary sm:text-[21px]">
              {movie.title}
            </h3>
            {director && (
              <p className="mt-1 truncate text-[12px] font-medium text-muted-foreground">
                감독 {director}
              </p>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
            <span className="rounded-md bg-background/70 px-2 py-1.5">
              <span className="block font-mono text-[9px] uppercase">평점</span>
              <span className="font-semibold text-foreground">
                {hasRating ? `★ ${rating.toFixed(1)}` : '첫 평점 남기기'}
              </span>
            </span>
            {audience > 0 && (
              <span className="rounded-md bg-background/70 px-2 py-1.5">
                <span className="block font-mono text-[9px] uppercase">
                  관객
                </span>
                <span className="font-semibold text-foreground">
                  {(audience / 10000).toFixed(0)}만명
                </span>
              </span>
            )}

            <span className="col-span-2 flex items-center justify-between border-t border-border pt-2 font-mono text-[10px]">
              <span>순위 변동</span>
              <span className={intenColor}>{intenLabel}</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
