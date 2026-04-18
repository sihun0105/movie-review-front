'use client'

import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { useAppToast } from '@/hooks/use-app-toast'
import { useAuthenticationCheck } from '@/hooks/use-authentication-check'
import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

interface ModifyArticleCommentArgs {
  commentId: number
  comment: string
}

const modifyCommentFetcher = async (
  url: string,
  { arg }: { arg: ModifyArticleCommentArgs },
) => {
  const formData = new FormData()
  formData.append('commentId', arg.commentId + '')
  formData.append('comment', arg.comment)

  const res = await fetch(url, {
    method: 'PUT',
    body: formData,
    cache: 'no-cache',
  })

  const result = await res.json()
  if (!res.ok) {
    console.error(`[useModifyArticleComment] ${url}, error: ${res.status}`)
    throw new Error(result.message || '댓글 수정에 실패했습니다.')
  }

  return result
}

export const useModifyArticleComment = (mutateComments?: () => void) => {
  const { showToast } = useAppToast()
  const { requireAuthentication } = useAuthenticationCheck()
  const params = useParams()
  const articleId = params?.id

  if (!articleId) {
    throw new Error('articleId is required')
  }

  const {
    trigger: triggerModify,
    isMutating: isModifyingComment,
    error: modifyCommentError,
  } = useSWRMutation(
    AppClientApiEndpoint.modifyArticleComment(+articleId),
    modifyCommentFetcher,
  )

  const modifyComment = requireAuthentication(
    async (
      args: ModifyArticleCommentArgs,
      {
        onSuccess,
        onError,
      }: { onSuccess?: () => void; onError?: () => void } = {},
    ) => {
      try {
        await triggerModify(args)
        showToast('댓글이 성공적으로 수정되었습니다.')
        mutateComments?.()
        onSuccess?.()
      } catch (e) {
        console.error(e)
        showToast('댓글 수정에 실패했습니다.')
        onError?.()
      }
    },
  )

  return {
    modifyComment,
    isModifyingComment,
    modifyCommentError,
  }
}
