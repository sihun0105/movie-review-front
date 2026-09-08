import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}))
vi.mock('@/lib/utils', () => ({
  cn: (...values: string[]) => values.join(' '),
}))
vi.mock('./articles/components/article-card', () => ({
  default: ({ article }: any) => (
    <a href={`/articles/${article.id}`}>{article.title}</a>
  ),
}))
vi.mock('@/components/dm', () => ({
  DmMovieDetail: ({ movie }: any) => (
    <>
      <h1>{movie.title}</h1>
      <p>{movie.plot}</p>
    </>
  ),
}))
vi.mock('./movie/[id]/components/movie-vod-modal', () => ({
  default: () => null,
}))
vi.mock('./movie/[id]/hooks/use-vod-modal-context', () => ({
  useVodModalContext: () => ({}),
}))
vi.mock('./movie/[id]/sections/director-filmography-section', () => ({
  DirectorFilmographySection: () => null,
}))
vi.mock('./movie/[id]/sections/movie-cast-section', () => ({
  MovieCastSection: () => null,
}))
vi.mock('@/config/app-client-api-endpoint', () => ({
  AppClientApiEndpoint: {
    listArticles: (page: number) => `/api/article?page=${page}`,
  },
}))
vi.mock('@/config/movie-api-endpoint', () => ({
  MovieClientApiEndpoint: {
    getMovieDetail: (id: string) => `/api/movie/${id}`,
  },
}))

import ArticleSection from './articles/components/article-section'
import DescriptionSection from './movie/[id]/sections/description-section'

describe('public HTML without browser JavaScript', () => {
  it('contains article links immediately from server-provided data', () => {
    const html = renderToStaticMarkup(
      <ArticleSection
        initialData={{
          articles: [{ id: '5', title: '그랜드 부다페스트 호텔 후기' } as any],
          hasNext: false,
        }}
      />,
    )
    expect(html).toContain('href="/articles/5"')
    expect(html).toContain('그랜드 부다페스트 호텔 후기')
    expect(html).not.toContain('loading...')
  })

  it('contains the movie heading and plot while SWR revalidates', () => {
    const html = renderToStaticMarkup(
      <DescriptionSection
        id="20250654"
        initialMovie={
          {
            id: 20250654,
            title: '오디세이',
            plot: '영화 줄거리',
            vods: [],
            actors: [],
          } as any
        }
      />,
    )
    expect(html).toContain('<h1>오디세이</h1>')
    expect(html).toContain('영화 줄거리')
    expect(html).not.toContain('로딩 중')
  })
})
