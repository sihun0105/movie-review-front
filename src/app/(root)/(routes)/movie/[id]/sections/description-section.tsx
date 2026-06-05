'use client'

import { DmMovieDetail } from '@/components/dm'
import { FunctionComponent } from 'react'
import MovieVodModal from '../components/movie-vod-modal'
import { useGetMovieDetail } from '../hooks/use-get-movie-detail'
import { useVodModalContext } from '../hooks/use-vod-modal-context'

interface DescriptionSectionProps {
  id: string
}

const DescriptionSection: FunctionComponent<DescriptionSectionProps> = ({
  id,
}) => {
  const { data, isLoading, error } = useGetMovieDetail(id)
  const { setOpen, setSrc, setTitle } = useVodModalContext()

  if (isLoading)
    return <p className="text-center text-muted-foreground">로딩 중...</p>
  if (error || !data)
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
      <DmMovieDetail movie={data} onVodClick={handleVodClick} />
    </>
  )
}

export default DescriptionSection
