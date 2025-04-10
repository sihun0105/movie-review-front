'use client'

import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import useSWRMutation from 'swr/mutation'
import { useAuthenticationCheck } from '@/hooks/use-authentication-check'
import { useAppToast } from '@/hooks/use-app-toast'
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'

interface CreateCommentArgs {
  movieId: string
  comment: string
}

const fetcher = async (url: string, { arg }: { arg: CreateCommentArgs }) => {
  const formData = new FormData()
  formData.append('movieId', arg.movieId)
  formData.append('comment', arg.comment)

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
    cache: 'no-cache',
  })

  const result = await res.json()

  if (!res.ok) {
    console.error(`[useCreateComment] ${url}, error: ${res.status}`)
    throw new Error(result.message || '댓글 등록에 실패했습니다.')
  }

  return result
}

export const useCreateComment = (id: string) => {
  const { requireAuthentication } = useAuthenticationCheck()
  const { showToast } = useAppToast()
  const router = useRouter()

  const {
    trigger,
    isMutating: isCreatingComment,
    error: createCommentError,
  } = useSWRMutation(AppClientApiEndpoint.createNewComment(id), fetcher)

  const createComment = requireAuthentication(
    async (
      arg: CreateCommentArgs,
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
        showToast('댓글이 성공적으로 등록되었습니다.')

        const keyPrefix = AppClientApiEndpoint.getComments(Number(id), 0).split(
          '?',
        )[0]
        await mutate(
          (key) => typeof key === 'string' && key.startsWith(keyPrefix),
          undefined,
          { revalidate: true },
        )

        router.refresh()
        onSuccess?.()
      } catch (e) {
        showToast('댓글 등록에 실패했습니다.')
        onError?.()
      }
    },
  )

  return {
    createComment,
    isCreatingComment,
    createCommentError,
  }
}
