import { MovieVod } from '@/modules/movie/movie-entity'
import { FunctionComponent, Suspense } from 'react'
import MovieVodModal from './movie-vod-modal'
import { useVodModalContext } from '../hooks/use-vod-modal-context'
import { Button } from '@/components/ui/button'

interface MovieCarouselProps {
  data: MovieVod[]
  title: string
}

const MovieCarousel: FunctionComponent<MovieCarouselProps> = ({
  data,
  title,
}) => {
  const { setOpen, setSrc, setTitle } = useVodModalContext()

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">VOD 데이터가 없습니다.</p>
  }

  return (
    <div className="carousel carousel-center space-x-4 rounded-box">
      <MovieVodModal />
      {data.map((vod) => (
        <Suspense fallback={<p>Loading video...</p>} key={vod.id}>
          <Button
            onClick={() => {
              setSrc(vod.vodUrl)
              setOpen(true)
              setTitle(title)
            }}
          >
            썸네일
          </Button>
        </Suspense>
      ))}
    </div>
  )
}

export default MovieCarousel
