'use client'

import { Movie } from '@/modules/movie/movie.entity'
import Link from 'next/link'
import { Poster } from './poster'
import { paletteForMovie } from './poster-palette'
import { PosterPreviewDialog } from './poster-preview-dialog'
import { RatingInput } from './rating-input'
import { SectionHead } from './section-head'
import { Stars } from './stars'

interface DmMovieDetailProps {
  movie: Movie
  averageScore?: number | null
  scoreCount?: number | null
  onVodClick?: () => void
  onScoreSaved?: () => unknown | Promise<unknown>
}

export function DmMovieDetail({
  movie,
  averageScore,
  scoreCount,
  onVodClick,
  onScoreSaved,
}: DmMovieDetailProps) {
  const palette = paletteForMovie(movie.id, movie.title)
  const rating = averageScore ?? movie.averageScore ?? 0
  const reviews = scoreCount ?? movie.scoreCount ?? 0
  const matchHref = `/match?movieTitle=${encodeURIComponent(movie.title)}`
  const shouldShowRank = movie.isRanked && movie.rank > 0
  const director = movie.director?.trim()
  const genres =
    movie.genre
      ?.split(/[,/·]/)
      .map((g) => g.trim())
      .filter(Boolean) ?? []
  const releaseYear = movie.openedAt
    ? new Date(movie.openedAt).getFullYear()
    : undefined
  const metadata = [...genres.slice(0, 2), movie.ratting?.trim(), releaseYear]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="pb-5">
      <div className="px-4 pt-6">
        <div className="flex items-end gap-3.5">
          <div className="relative w-[106px] shrink-0">
            <PosterPreviewDialog title={movie.title} imageUrl={movie.poster}>
              <Poster
                title={movie.title}
                palette={palette}
                imageUrl={movie.poster}
              />
            </PosterPreviewDialog>
          </div>
          <div className="min-w-0 pb-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h1 className="text-[24px] font-bold leading-tight tracking-tight text-foreground">
                {movie.title}
              </h1>
              {shouldShowRank && (
                <span className="whitespace-nowrap rounded-sm bg-foreground px-2 py-1 font-mono text-[10px] font-semibold text-background">
                  박스오피스 {movie.rank}위
                </span>
              )}
            </div>
            <div className="mt-1 font-mono text-[11px] text-muted-foreground">
              {metadata}
            </div>
            {director && (
              <div className="mt-1.5 text-[12px] text-muted-foreground">
                <span className="mr-1.5 font-medium text-foreground">감독</span>
                {director}
              </div>
            )}
          </div>
        </div>

        {/* 평점 */}
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-card p-3">
          <div className="text-center">
            <div className="text-[32px] font-bold text-foreground">
              {rating.toFixed(1)}
            </div>
            <Stars value={rating} size={10} />
            <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
              {reviews.toLocaleString()}명
            </div>
          </div>
          <div className="h-full w-px self-stretch bg-border" aria-hidden />
          <div className="flex-1">
            <RatingInput
              movieCd={Number(movie.id)}
              onScoreSaved={onScoreSaved}
            />
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="mt-3 flex gap-2">
          {onVodClick && (
            <button
              type="button"
              onClick={onVodClick}
              className="flex-1 rounded-md border border-border py-2.5 text-[13px] font-medium text-foreground hover:bg-accent"
            >
              ▶ 영상 보기
            </button>
          )}
          <Link
            href={matchHref}
            className="flex flex-1 items-center justify-center rounded-md bg-primary py-2.5 text-[13px] font-medium text-primary-foreground"
          >
            같이 볼 사람 찾기
          </Link>
        </div>

        {/* 시놉시스 */}
        {movie.plot && (
          <>
            <SectionHead>시놉시스</SectionHead>
            <p className="break-keep text-[13px] leading-[1.7] text-muted-foreground">
              {movie.plot}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
