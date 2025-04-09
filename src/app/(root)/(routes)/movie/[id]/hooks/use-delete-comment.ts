import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import useSWRMutation from 'swr/mutation'
import { useAppToast } from '@/hooks/use-app-toast'
import { mutate } from 'swr'

const fetcher = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      commentId: number
    }
  },
) => {
  const formData = new FormData()
  formData.append('commentId', arg.commentId + '')
  const res = await fetch(url, {
    method: 'DELETE',
    body: formData,
  })
  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.message || '댓글 삭제에 실패했습니다.')
  }

  return result
}

export const useDeleteComment = (movieId: number) => {
  const { showToast } = useAppToast()

  const { trigger, isMutating, error } = useSWRMutation(
    AppClientApiEndpoint.deleteCommnet(movieId),
    fetcher,
  )

  const deleteComment = async (
    arg: {
      commentId: number
    },
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: () => void
      onError?: () => void
    } = {},
  ) => {
    try {
      await trigger(arg)
      showToast('댓글이 성공적으로 삭제되었습니다.')

      // ✅ SWR Infinite 전용 invalidate
      const keyPrefix = AppClientApiEndpoint.getComments(movieId, 0).split(
        '?',
      )[0]
      await mutate(
        (key) => typeof key === 'string' && key.startsWith(keyPrefix),
        undefined,
        { revalidate: true },
      )

      onSuccess?.()
    } catch (e) {
      showToast('댓글 삭제에 실패했습니다.')
      onError?.()
    }
  }

  return {
    deleteComment,
    isDeletingComment: isMutating,
    deleteCommentError: error,
  }
}
