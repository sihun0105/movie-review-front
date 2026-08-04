import {
  DeletableActivityItem,
  UserActivityPage,
  UserActivityRepository,
  UserActivityType,
} from '@/modules/user-activity'
import { useState } from 'react'
import useSWRInfinite from 'swr/infinite'

const repository = new UserActivityRepository()

export function useAccountActivity(
  type: UserActivityType,
  onDeleted: () => void,
) {
  const [deleteTarget, setDeleteTarget] =
    useState<DeletableActivityItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const { data, error, isLoading, size, setSize, mutate } =
    useSWRInfinite<UserActivityPage>(
      (index, previous) =>
        previous && !previous.hasNext
          ? null
          : ['account-activity', type, index + 1],
      ([, activityType, page]) =>
        repository.getActivity(
          activityType as UserActivityType,
          page as number,
        ),
      { revalidateFirstPage: false },
    )

  const items = data?.flatMap((page) => page.items) ?? []
  const hasNext = data?.[data.length - 1]?.hasNext ?? false
  const totalCount = data?.[0]?.totalCount ?? 0
  const isLoadingMore = isLoading || (size > 0 && !data?.[size - 1])

  const deleteItem = async () => {
    if (!deleteTarget || isDeleting) return
    setIsDeleting(true)
    setDeleteError('')
    try {
      await repository.deleteItem(deleteTarget)
      setDeleteTarget(null)
      await mutate()
      onDeleted()
    } catch {
      setDeleteError('삭제하지 못했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    items,
    error,
    isLoading,
    isLoadingMore,
    hasNext,
    totalCount,
    deleteTarget,
    deleteError,
    isDeleting,
    setDeleteTarget,
    deleteItem,
    loadMore: () => setSize(size + 1),
    retry: () => mutate(),
  }
}
