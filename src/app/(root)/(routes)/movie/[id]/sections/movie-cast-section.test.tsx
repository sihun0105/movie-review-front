import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { MovieCastSection } from './movie-cast-section'

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...props} />
  ),
}))
vi.mock('@/components/dm/section-head', () => ({
  SectionHead: ({ children }: { children: React.ReactNode }) => (
    <h2>{children}</h2>
  ),
}))

describe('MovieCastSection', () => {
  it('shows actor portrait, name, and character', () => {
    const html = renderToStaticMarkup(
      <MovieCastSection
        actors={[
          {
            id: 6193,
            name: '맷 데이먼',
            character: '오디세우스',
            profileUrl: 'https://image.tmdb.org/t/p/w342/matt.jpg',
            sortOrder: 0,
          },
        ]}
      />,
    )

    expect(html).toContain('주연 배우')
    expect(html).toContain('맷 데이먼')
    expect(html).toContain('오디세우스')
    expect(html).toContain('/matt.jpg')
  })

  it('does not render an empty section', () => {
    expect(renderToStaticMarkup(<MovieCastSection actors={[]} />)).toBe('')
  })
})
