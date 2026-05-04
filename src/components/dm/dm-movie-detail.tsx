'use client'

import { Movie } from '@/modules/movie/movie.entity'
import Link from 'next/link'
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

export function DmMovieDetail({ movie, averageScore, scoreCount }: DmMovieDetailProps) {
  const palette = paletteForMovie(movie.id, movie.title)
  const rating = averageScore ?? movie.averageScore ?? 0
  const reviews = scoreCount ?? movie.scoreCount ?? 0
  const genres = movie.genre?.split(/[,/·]/).map((g) => g.trim()).filter(Boolean) ?? []
  const releaseYear = movie.openedAt ? new Date(movie.openedAt).getFullYear() : undefined

  return (
    <div className="pb-5">
      {/* 포스터 배경 블러 */}
      <div
        className="h-[140px] w-full"
        style={{
          background: `linear-gradient(160deg, ${palette[0]} 0%, ${palette[1]} 100%)`,
          filter: 'blur(0px)',
        }}
      />

      <div className="relative -mt-[70px] px-4">
        <div className="flex items-end gap-3.5">
          <div className="w-[106px] shrink-0">
            <Poster title={movie.title} palette={palette} imageUrl={movie.poster} />
          </div>
          <div className="pb-1">
            {movie.rank && (
              <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                #{movie.rank} 박스오피스
              </span>
            )}
            <h1 className="mt-2 text-[24px] font-bold leading-tight tracking-tight text-foreground">
              {movie.title}
            </h1>
            <div className="mt-1 font-mono text-[11px] text-muted-foreground">
              {genres.slice(0, 2).join(' · ')}
              {releaseYear && ` · ${releaseYear}`}
            </div>
          </div>
        </div>

        {/* 평점 */}
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-card p-3">
          <div className="text-center">
            <div className="text-[32px] font-bold text-foreground">{rating.toFixed(1)}</div>
            <Stars value={rating} size={10} />
            <div className="mt-0.5 font-mono text-[10px] text-muted-foreground">
              {reviews.toLocaleString()}명
            </div>
          </div>
          <div className="h-full w-px self-stretch bg-border" aria-hidden />
          <div className="flex-1">
            <RatingInput movieCd={Number(movie.id)} />
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="mt-3 flex gap-2">
          <button className="flex-1 rounded-md border border-border py-2.5 text-[13px] font-medium text-foreground hover:bg-accent">
            ▶ VOD 보기
          </button>
          <Link
            href="/match"
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
