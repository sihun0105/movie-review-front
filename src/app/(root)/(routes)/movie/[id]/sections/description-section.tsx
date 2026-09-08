'use client'

import { DmMovieDetail } from '@/components/dm'
import React, { FunctionComponent } from 'react'
import MovieVodModal from '../components/movie-vod-modal'
import { useGetMovieDetail } from '../hooks/use-get-movie-detail'
import { useVodModalContext } from '../hooks/use-vod-modal-context'
import { DirectorFilmographySection } from './director-filmography-section'
import { MovieCastSection } from './movie-cast-section'
import type { Movie } from '@/modules/movie/movie.entity'

interface DescriptionSectionProps {
  id: string
  initialMovie?: Movie
}

const DescriptionSection: FunctionComponent<DescriptionSectionProps> = ({
  id,
  initialMovie,
}) => {
  const {
    data,
    isLoading,
    mutate: refreshMovie,
  } = useGetMovieDetail(id, initialMovie)
  const { setOpen, setSrc, setTitle } = useVodModalContext()

  if (isLoading && !data)
    return <p className="text-center text-muted-foreground">로딩 중...</p>
  if (!data)
    return (
      <p className="text-center text-primary">데이터를 불러오지 못했습니다.</p>
    )

  const firstVod = data.vods?.[0]
  const handleVodClick = firstVod
    ? () => {
        setSrc(firstVod.vodUrl)
        setTitle(data.title)
        setOpen(true)
      }
    : undefined

  return (
    <>
      <MovieVodModal />
      <DmMovieDetail
        movie={data}
        onVodClick={handleVodClick}
        onScoreSaved={refreshMovie}
      />
      <MovieCastSection actors={data.actors} />
      <DirectorFilmographySection movie={data} />
    </>
  )
}

export default DescriptionSection
