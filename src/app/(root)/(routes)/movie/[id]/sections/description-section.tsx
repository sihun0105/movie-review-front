'use client'

import { FunctionComponent } from 'react'
import MovieDetail from '../components/movie-detail'
import { useGetMovieDetail } from '../hooks/use-get-movie-detail'
import MovieCarousel from '../components/movie-carousel'
import MovieVodModal from '../components/movie-vod-modal'

interface DescriptionSectionProps {
  id: string
}

const DescriptionSection: FunctionComponent<DescriptionSectionProps> = ({
  id,
}) => {
  const { data, isLoading, error } = useGetMovieDetail(id)

  if (isLoading) return <p className="text-center text-gray-400">로딩 중...</p>
  if (error || !data)
    return (
      <p className="text-center text-red-500">데이터를 불러오지 못했습니다.</p>
    )

  if (data) {
    return (
      <>
        <head>
          <title>{data.title} - Drunken Movie</title>
          <meta name="description" content={data.plot} />
          <meta property="og:title" content={`${data.title} - Drunken Movie`} />
          <meta property="og:description" content={data.plot} />
          <meta property="og:image" content={data.poster} />
        </head>
        <MovieVodModal />
        <MovieDetail movie={data} />
        {data.vods && <MovieCarousel data={data.vods} title={data.title} />}
      </>
    )
  }

  return <MovieDetail movie={data} />
}

export default DescriptionSection
