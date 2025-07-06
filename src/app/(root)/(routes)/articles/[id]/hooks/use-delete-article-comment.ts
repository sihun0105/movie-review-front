'use client'

import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { useAppToast } from '@/hooks/use-app-toast'
import { useParams } from 'next/navigation'
import useSWRMutation from 'swr/mutation'

interface DeleteArticleCommentArgs {
  commentId: number
}

const deleteCommentFetcher = async (
  url: string,
  { arg }: { arg: DeleteArticleCommentArgs },
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

export const useDeleteArticleComment = (mutateComments?: () => void) => {
  const { showToast } = useAppToast()
  const params = useParams()
  const articleId = params?.id

  if (!articleId) {
    throw new Error('articleId is required')
  }

  const {
    trigger: triggerDelete,
    isMutating: isDeletingComment,
    error: deleteCommentError,
  } = useSWRMutation(
    AppClientApiEndpoint.deleteArticleComment(+articleId),
    deleteCommentFetcher,
  )

  const deleteComment = async (
    args: DeleteArticleCommentArgs,
    {
      onSuccess,
      onError,
    }: { onSuccess?: () => void; onError?: () => void } = {},
  ) => {
    try {
      await triggerDelete(args)
      showToast('댓글이 성공적으로 삭제되었습니다.')
      mutateComments?.()
      onSuccess?.()
    } catch (e) {
      showToast('댓글 삭제에 실패했습니다.')
      onError?.()
    }
  }

  return {
    deleteComment,
    isDeletingComment,
    deleteCommentError,
  }
}
