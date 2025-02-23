'use client'
import { FunctionComponent } from 'react'
import { useGetMovieDetail } from '../hooks/use-get-movie-detail'
interface DescriptionSectionProps {
  id: string
}

const DescriptionSection: FunctionComponent<DescriptionSectionProps> = ({
  id,
}) => {
  const { data, isLoading, error } = useGetMovieDetail(id)
  console.log(data)
  return <main>DescriptionSection</main>
}

export default DescriptionSection
