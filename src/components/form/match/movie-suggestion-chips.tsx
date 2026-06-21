'use client'

import type { Movie } from '@/modules/movie'
import { useEffect, useState } from 'react'

interface MovieSuggestionChipsProps {
  selectedTitle?: string
  onSelect: (_title: string) => void
}

export function MovieSuggestionChips({
  selectedTitle,
  onSelect,
}: MovieSuggestionChipsProps) {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    let mounted = true
    fetch('/api/movie?pageSize=8')
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (mounted) setMovies(data?.movies ?? [])
      })
      .catch(() => {
        if (mounted) setMovies([])
      })

    return () => {
      mounted = false
    }
  }, [])

  if (movies.length === 0) return null

  return (
    <div className="mt-4">
      <p className="mb-2 text-[13px] font-semibold text-muted-foreground">
        요즘 많이 보는 영화
      </p>
      <div className="flex flex-wrap gap-2">
        {movies.map((movie) => {
          const selected = selectedTitle === movie.title
          return (
            <button
              key={movie.id}
              type="button"
              onClick={() => onSelect(movie.title)}
              className={`rounded-2xl rounded-tl-md border px-3 py-2 text-left text-[13px] font-semibold transition ${
                selected
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-secondary text-foreground hover:border-primary'
              }`}
            >
              {movie.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
