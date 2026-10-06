import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

vi.stubGlobal('React', React)
vi.mock('next/link', () => ({
  default: ({ children, ...props }: React.ComponentProps<'a'>) => (
    <a {...props}>{children}</a>
  ),
}))
vi.mock('./poster', () => ({ Poster: () => <div /> }))
vi.mock('./poster-palette', () => ({
  paletteForMovie: () => ({ h: 0, c: 0, lt: 0, lb: 0 }),
}))

import { MovieListCard } from './movie-list-card'

describe('MovieListCard accessibility', () => {
  it('names the movie detail link with its title', () => {
    const html = renderToStaticMarkup(
      <MovieListCard
        movie={
          {
            id: 20250654,
            title: '오디세이',
            rank: 1,
            rankInten: 0,
          } as any
        }
      />,
    )

    expect(html).toContain('aria-label="오디세이 영화 상세 보기"')
  })
})
