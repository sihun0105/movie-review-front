import useSWR from 'swr'
import { MatchApplication, MatchPost } from '@/lib/type'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// 내가 신청한 매칭 목록
export const useMyApplications = () => {
  const { data, error, isLoading, mutate } = useSWR<{
    applications: MatchApplication[]
  }>('/api/match/my-applications', fetcher)

  return {
    applications: data?.applications || [],
    isLoading,
    error,
    refetch: mutate,
  }
}

// 내가 작성한 매칭 목록
export const useMyPosts = () => {
  const { data, error, isLoading, mutate } = useSWR<{
    matches: MatchPost[]
  }>('/api/match/my-posts', fetcher)

  return {
    matches: data?.matches || [],
    isLoading,
    error,
    refetch: mutate,
  }
}

// 신청 취소
export const useCancelApplication = () => {
  const cancelApplication = async (applicationId: string) => {
    const response = await fetch(`/api/match/applications/${applicationId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to cancel application')
    }

    return response.json()
  }

  return { cancelApplication }
}
