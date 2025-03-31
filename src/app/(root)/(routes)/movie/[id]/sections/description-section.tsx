'use client'

import { FunctionComponent } from 'react'
import MovieDetail from '../components/movie-detail'
import { useGetMovieDetail } from '../hooks/use-get-movie-detail'

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

  return <MovieDetail movie={data} />
}

export default DescriptionSection
