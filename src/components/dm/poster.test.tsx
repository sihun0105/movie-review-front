import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Poster } from './poster'
import type { ImageProps } from 'next/image'
import { RouterContext } from 'next/dist/shared/lib/router-context'

vi.stubGlobal('React', React)

const hooks = vi.hoisted(() => ({
  state: undefined as unknown,
  update: vi.fn(),
}))
vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react')
  return {
    ...actual,
    useState: (initial: unknown) => [hooks.state ?? initial, hooks.update],
  }
})
vi.mock('@/lib/utils', () => ({
  cn: (...v: unknown[]) => v.filter(Boolean).join(' '),
}))

const props = {
  title: 'Movie title',
  palette: { h: 18, c: 0.1, lt: 0.32, lb: 0.1 },
  imageUrl: '/poster.jpg',
}

describe('Poster image', () => {
  beforeEach(() => {
    hooks.state = undefined
    hooks.update.mockClear()
  })

  it('renders an optimized, lazy HTML image with a meaningful alt and stable crop', () => {
    const html = renderToStaticMarkup(<Poster {...props} />)
    expect(html).toContain('<img')
    expect(html).toContain('alt="Movie title 포스터"')
    expect(html).toContain('/_next/image?')
    expect(html).toContain('loading="lazy"')
    expect(html).toContain('aspect-[2/3]')
    expect(html).toContain('object-cover')
    expect(html).not.toContain('background-image')
  })

  it('accepts explicit sizes and priority for the primary poster only', () => {
    const html = renderToStaticMarkup(
      <RouterContext.Provider value={{} as never}>
        <Poster {...props} sizes="106px" priority />
      </RouterContext.Provider>,
    )
    expect(html).toContain('sizes="106px"')
    expect(html).not.toContain('loading="lazy"')
  })

  it('keeps a title fallback while loading and removes it after load', () => {
    expect(renderToStaticMarkup(<Poster {...props} />)).toContain(
      'aria-busy="true"',
    )
    hooks.state = { src: props.imageUrl, status: 'loaded' }
    const html = renderToStaticMarkup(<Poster {...props} />)
    expect(html).not.toContain('aria-busy="true"')
    expect(html).not.toContain('>Movie title</div>')
  })

  it('removes failed images but preserves the title and dimensions', () => {
    hooks.state = { src: props.imageUrl, status: 'error' }
    const html = renderToStaticMarkup(<Poster {...props} />)
    expect(html).not.toContain('<img')
    expect(html).toContain('Movie title')
    expect(html).toContain('aspect-[2/3]')
  })

  it.each([undefined, '', '   ', 'javascript:alert(1)'])(
    'falls back for missing or invalid URL %s',
    (imageUrl) => {
      const html = renderToStaticMarkup(
        <Poster {...props} imageUrl={imageUrl} />,
      )
      expect(html).not.toContain('<img')
      expect(html).toContain('Movie title')
    },
  )

  it('retries when a failed source is replaced', () => {
    hooks.state = { src: '/old.jpg', status: 'error' }
    expect(renderToStaticMarkup(<Poster {...props} />)).toContain('<img')
  })

  it('transitions through the real image load and error handlers', () => {
    const tree = Poster(props)
    const image = React.Children.toArray(tree.props.children).find(
      (child) =>
        React.isValidElement<ImageProps>(child) &&
        child.props.src === props.imageUrl,
    ) as React.ReactElement<ImageProps>
    image.props.onLoadingComplete?.({} as HTMLImageElement)
    expect(hooks.update).toHaveBeenLastCalledWith({
      src: props.imageUrl,
      status: 'loaded',
    })
    image.props.onError?.({} as React.SyntheticEvent<HTMLImageElement>)
    expect(hooks.update).toHaveBeenLastCalledWith({
      src: props.imageUrl,
      status: 'error',
    })
  })
})
