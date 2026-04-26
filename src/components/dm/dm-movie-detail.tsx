'use client'

import { Movie } from '@/modules/movie/movie.entity'
import Link from 'next/link'
import { MovieBackdrop } from './movie-backdrop'
import { Poster } from './poster'
import { paletteForMovie } from './poster-palette'
import { RatingInput } from './rating-input'
import { SectionHead } from './section-head'
import { Stars } from './stars'

interface DmMovieDetailProps {
  movie: Movie & { rank?: number }
  averageScore?: number | null
  scoreCount?: number | null
}

export function DmMovieDetail({
  movie,
  averageScore,
  scoreCount,
}: DmMovieDetailProps) {
  const palette = paletteForMovie(movie.id, movie.title)
  const rating = averageScore ?? movie.averageScore ?? 0
  const reviews = scoreCount ?? movie.scoreCount ?? 0
  const genres = movie.genre
    ?.split(/[,/·]/)
    .map((g) => g.trim())
    .filter(Boolean) ?? []
  const releaseYear = movie.openedAt
    ? new Date(movie.openedAt).getFullYear()
    : undefined

  return (
    <div className="bg-dm-bg pb-5 text-dm-text">
      <MovieBackdrop palette={palette} />

      <div className="relative -mt-[70px] px-4">
        <div className="flex items-end gap-3.5">
          <div className="w-[106px] flex-shrink-0">
            <Poster
              title={movie.title}
              palette={palette}
              imageUrl={movie.poster}
            />
          </div>
          <div className="pb-1">
            <div className="font-dm-mono text-[10px] uppercase tracking-[1px] text-dm-amber">
              {movie.rank
                ? `NOW PLAYING · #${movie.rank}`
                : 'NOW PLAYING'}
            </div>
            <h1 className="mt-1 font-dm-display text-[28px] italic leading-[1.1] text-dm-text">
              {movie.title}
            </h1>
            <div className="mt-1.5 text-[11px] leading-[1.5] text-dm-text-muted">
              {movie.director}
              {genres.length > 0 && ` · ${genres.join('·')}`}
              <br />
              {releaseYear && `${releaseYear}`}
              {movie.ratting && ` · ${movie.ratting}`}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3.5 border border-dm-line bg-dm-surface p-3">
          <div>
            <div className="font-dm-rank text-[36px] leading-none text-dm-amber">
              {rating.toFixed(1)}
            </div>
            <Stars value={rating} size={10} />
            <div className="mt-0.5 text-[10px] text-dm-text-faint">
              {reviews.toLocaleString()}명 평가
            </div>
          </div>
          <div className="self-stretch w-px bg-dm-line" aria-hidden />
          <div className="flex-1">
            <RatingInput movieCd={Number(movie.id)} />
          </div>
        </div>

        <div className="mt-2.5 flex gap-1.5">
          <button className="flex-1 border border-dm-line-2 bg-dm-surface-2 px-3.5 py-3 text-[13px] font-semibold text-dm-text">
            ▶ VOD 보기
          </button>
          <Link
            href="/match"
            className="flex-1 border border-dm-red bg-dm-red px-3.5 py-3 text-center text-[13px] font-semibold text-white"
          >
            🎟 같이 볼 사람
          </Link>
        </div>

        {movie.plot && (
          <>
            <SectionHead>시놉시스</SectionHead>
            <div className="break-keep text-[13px] leading-[1.7] text-dm-text">
              {movie.plot}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
