import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import useSWRMutate from 'swr/mutation'
import { useAuthenticationCheck } from '@/hooks/use-authentication-check'

const fetcher = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      movieId: string
      comment: string
    }
  },
) => {
  const formData = new FormData()
  formData.append('movieId', arg.movieId)
  formData.append('comment', arg.comment)
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  })
  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.message)
  }

  return result
}

export const useCreateComment = (id: string) => {
  const { requireAuthentication } = useAuthenticationCheck()
  const { trigger, isMutating, error } = useSWRMutate(
    AppClientApiEndpoint.createNewComment(id),
    fetcher,
  )

  const createComment = requireAuthentication(
    (
      arg: {
        movieId: string
        comment: string
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
    },
  )

  return {
    createComment,
    isCreatingComment: isMutating,
    createCommentError: error,
  }
}
