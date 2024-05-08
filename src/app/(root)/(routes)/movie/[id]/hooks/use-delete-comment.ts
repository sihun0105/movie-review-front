import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import useSWRMutate from 'swr/mutation'

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
    throw new Error(result.message)
  }

  return result
}

export const useDeleteComment = (id: number) => {
  const { trigger, isMutating, error } = useSWRMutate(
    AppClientApiEndpoint.deleteCommnet(id),
    fetcher,
  )

  const deleteComment = (
    arg: {
      commentId: number
    },
    {
      onSuccess,
      onError,
    }: {
      onSuccess: () => void
      onError: () => void
    },
  ) => {
    trigger(arg, {
      onSuccess,
      onError,
    })
  }

  return {
    deleteComment,
    isCreatingComment: isMutating,
    deleteCommentError: error,
  }
}
