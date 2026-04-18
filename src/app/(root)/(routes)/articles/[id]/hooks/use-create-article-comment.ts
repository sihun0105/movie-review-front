'use client'

import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { useAppToast } from '@/hooks/use-app-toast'
import { useAuthenticationCheck } from '@/hooks/use-authentication-check'
import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

interface CreateArticleCommentArgs {
  articleId: string
  comment: string
}

const createCommentFetcher = async (
  url: string,
  { arg }: { arg: CreateArticleCommentArgs },
) => {
  const formData = new FormData()
  formData.append('articleId', arg.articleId)
  formData.append('comment', arg.comment)

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
    cache: 'no-cache',
  })

  const result = await res.json()
  if (!res.ok) {
    console.error(`[useCreateArticleComment] ${url}, error: ${res.status}`)
    throw new Error(result.message || '댓글 등록에 실패했습니다.')
  }
  return result
}

export const useCreateArticleComment = (mutateComments?: () => void) => {
  const { showToast } = useAppToast()
  const { requireAuthentication } = useAuthenticationCheck()
  const params = useParams()
  const articleId = params?.id

  if (!articleId) {
    throw new Error('articleId is required')
  }

  const {
    trigger: triggerCreate,
    isMutating: isCreatingComment,
    error: createCommentError,
  } = useSWRMutation(
    AppClientApiEndpoint.createArticleComment(+articleId),
    createCommentFetcher,
  )

  const createComment = requireAuthentication(
    async (
      args: CreateArticleCommentArgs,
      {
        onSuccess,
        onError,
      }: { onSuccess?: () => void; onError?: () => void } = {},
    ) => {
      try {
        await triggerCreate(args)
        showToast('댓글이 성공적으로 등록되었습니다.')
        mutateComments?.()
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
