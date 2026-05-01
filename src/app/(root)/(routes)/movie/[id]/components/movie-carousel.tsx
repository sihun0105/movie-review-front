'use client'

import { MovieVod } from '@/modules/movie/movie.entity'
import { FunctionComponent, Suspense } from 'react'
import { useVodModalContext } from '../hooks/use-vod-modal-context'
import MovieVodModal from './movie-vod-modal'

interface MovieCarouselProps {
  data: MovieVod[]
  title: string
}

const MovieCarousel: FunctionComponent<MovieCarouselProps> = ({ data, title }) => {
  const { setOpen, setSrc, setTitle } = useVodModalContext()

  if (!data || data.length === 0)
    return (
      <p className="text-center font-dm-mono text-[11px] text-dm-text-faint">
        VOD 데이터가 없습니다.
      </p>
    )

  return (
    <div className="flex gap-3 overflow-x-auto">
      <MovieVodModal />
      {data.map((vod) => (
        <Suspense fallback={null} key={vod.id}>
          <button
            onClick={() => {
              setSrc(vod.vodUrl)
              setOpen(true)
              setTitle(title)
            }}
            className="shrink-0 border border-dm-line-2 bg-dm-surface px-4 py-3 font-dm-mono text-[11px] text-dm-text-muted hover:border-dm-amber hover:text-dm-amber"
          >
            썸네일
          </button>
        </Suspense>
      ))}
    </div>
  )
}

export default MovieCarousel
