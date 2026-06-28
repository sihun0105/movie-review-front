'use client'

import { Movie } from '@/modules/movie/movie.entity'
import Link from 'next/link'
import { Poster } from '@/components/dm/poster'
import { paletteForMovie } from '@/components/dm/poster-palette'
import { SectionHead } from '@/components/dm/section-head'
import { useDirectorFilmography } from '../hooks/use-director-filmography'

interface DirectorFilmographySectionProps {
  movie: Movie
}

function FilmographyCard({ movie }: { movie: Movie }) {
  const palette = paletteForMovie(movie.id, movie.title)
  const releaseYear = movie.openedAt
    ? new Date(movie.openedAt).getFullYear()
    : undefined
  const genre =
    movie.genre
      ?.split(/[,/·]/)
      .map((item) => item.trim())
      .filter(Boolean)[0] ?? ''
  const rating = movie.averageScore ?? 0

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="block w-[132px] shrink-0 rounded-lg border border-border bg-card p-2 transition-colors hover:bg-accent"
    >
      <Poster
        title={movie.title}
        palette={palette}
        imageUrl={movie.poster}
        rounded="md"
      />
      <h3 className="mt-2 line-clamp-2 min-h-[34px] text-[13px] font-semibold leading-[1.3] text-foreground">
        {movie.title}
      </h3>
      <p className="mt-1 truncate font-mono text-[10px] text-muted-foreground">
        {[releaseYear, genre].filter(Boolean).join(' · ')}
      </p>
      {rating > 0 && (
        <p className="mt-1 font-mono text-[10px] font-semibold text-primary">
          ★ {rating.toFixed(1)}
        </p>
      )}
    </Link>
  )
}

export function DirectorFilmographySection({
  movie,
}: DirectorFilmographySectionProps) {
  const { director, movies, isLoading, error } = useDirectorFilmography(movie)

  if (!director || error || (!isLoading && movies.length === 0)) return null

  return (
    <section className="px-4 pb-5">
      <SectionHead>{director} 감독 필모그래피</SectionHead>
      {isLoading ? (
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[244px] w-[132px] shrink-0 animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      ) : (
        <div className="-mx-4 overflow-x-auto px-4 pb-1">
          <div className="flex w-max gap-3 pr-4">
            {movies.map((item) => (
              <FilmographyCard key={item.id} movie={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
