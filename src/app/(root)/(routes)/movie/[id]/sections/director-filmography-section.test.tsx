import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
vi.mock('next/link', () => ({
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}))
vi.mock('@/components/dm/poster', () => ({ Poster: () => null }))
vi.mock('@/components/dm/poster-palette', () => ({
  paletteForMovie: () => ({}),
}))
vi.mock('@/components/dm/section-head', () => ({
  SectionHead: ({ children }: any) => <h2>{children}</h2>,
}))
vi.mock('@/config/movie-api-endpoint', () => ({
  MovieClientApiEndpoint: { getMoviesByDirector: () => '/api/movie/director' },
}))
import { DirectorFilmographySection } from './director-filmography-section'

describe('filmography server fallback', () => {
  it('includes a crawlable film link before any browser request', () => {
    const props = {
      movie: { id: 20250654, director: '크리스토퍼 놀란' },
      initialData: [
        {
          id: 20226431,
          title: '오펜하이머',
          genre: '드라마',
          openedAt: '2023-08-15',
        },
      ],
    } as any
    const html = renderToStaticMarkup(<DirectorFilmographySection {...props} />)
    expect(html).toContain('href="/movie/20226431"')
    expect(html).toContain('오펜하이머')
  })
})
