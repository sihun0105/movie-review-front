'use client'

import { DmMovieDetail } from '@/components/dm'
import { FunctionComponent } from 'react'
import MovieCarousel from '../components/movie-carousel'
import MovieVodModal from '../components/movie-vod-modal'
import { useGetMovieDetail } from '../hooks/use-get-movie-detail'

interface DescriptionSectionProps {
  id: string
}

const DescriptionSection: FunctionComponent<DescriptionSectionProps> = ({
  id,
}) => {
  const { data, isLoading, error } = useGetMovieDetail(id)

  if (isLoading)
    return <p className="text-center text-dm-text-muted">로딩 중...</p>
  if (error || !data)
    return (
      <p className="text-center text-dm-red">데이터를 불러오지 못했습니다.</p>
    )

  return (
    <>
      <MovieVodModal />
      <DmMovieDetail movie={data} />
      {data.vods && <MovieCarousel data={data.vods} title={data.title} />}
    </>
  )
}

export default DescriptionSection
