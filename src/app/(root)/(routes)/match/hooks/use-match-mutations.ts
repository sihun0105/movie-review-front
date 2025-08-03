import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { CreateMatchPostRequest } from '@/lib/type'
import useSWRMutation from 'swr/mutation'

// Match 생성
const createMatchFetcher = async (
  url: string,
  { arg }: { arg: CreateMatchPostRequest },
) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to create match')
  }

  return await response.json()
}

export const useCreateMatch = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    AppClientApiEndpoint.createMatchPost(),
    createMatchFetcher,
  )

  return {
    createMatch: trigger,
    isCreating: isMutating,
    error,
  }
}

// Match 수정
const updateMatchFetcher = async (
  url: string,
  { arg }: { arg: Partial<CreateMatchPostRequest> },
) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to update match')
  }

  return await response.json()
}

export const useUpdateMatch = (matchId: string) => {
  const { trigger, isMutating, error } = useSWRMutation(
    AppClientApiEndpoint.updateMatchPost(matchId),
    updateMatchFetcher,
  )

  return {
    updateMatch: trigger,
    isUpdating: isMutating,
    error,
  }
}

// Match 삭제
const deleteMatchFetcher = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to delete match')
  }

  return await response.json()
}

export const useDeleteMatch = (matchId: string) => {
  const { trigger, isMutating, error } = useSWRMutation(
    AppClientApiEndpoint.deleteMatchPost(matchId),
    deleteMatchFetcher,
  )

  return {
    deleteMatch: trigger,
    isDeleting: isMutating,
    error,
  }
}

// Match 신청
const applyMatchFetcher = async (
  url: string,
  { arg }: { arg: { message: string } },
) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to apply to match')
  }

  return await response.json()
}

export const useApplyMatch = (matchId: string) => {
  const { trigger, isMutating, error } = useSWRMutation(
    AppClientApiEndpoint.applyToMatch(matchId),
    applyMatchFetcher,
  )

  return {
    applyToMatch: trigger,
    isApplying: isMutating,
    error,
  }
}

// 신청 상태 변경
const updateApplicationStatusFetcher = async (
  url: string,
  { arg }: { arg: { status: 'accepted' | 'rejected' } },
) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to update application status')
  }

  return await response.json()
}

export const useUpdateApplicationStatus = (
  matchId: string,
  applicationId: string,
) => {
  const { trigger, isMutating, error } = useSWRMutation(
    AppClientApiEndpoint.updateApplicationStatus(matchId, applicationId),
    updateApplicationStatusFetcher,
  )

  return {
    updateApplicationStatus: trigger,
    isUpdating: isMutating,
    error,
  }
}
