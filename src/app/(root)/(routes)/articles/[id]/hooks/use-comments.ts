'use client'

import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { useAppToast } from '@/hooks/use-app-toast'
import { useAuthenticationCheck } from '@/hooks/use-authentication-check'
import { ArticleRepliesResponse } from '@/lib/type'
import { useParams } from 'next/navigation'
import useSWRInfinite from 'swr/infinite'
import useSWRMutation from 'swr/mutation'

interface CreateArticleCommentArgs {
  articleId: string
  comment: string
}

interface DeleteArticleCommentArgs {
  commentId: number
}

interface ModifyArticleCommentArgs {
  commentId: number
  comment: string
}

/** 댓글 목록 key */
const getKey =
  (articleId: number) =>
  (pageIndex: number, previousPageData: ArticleRepliesResponse | null) => {
    if (previousPageData && !previousPageData.hasNext) return null
    return AppClientApiEndpoint.getArticleComments(articleId, pageIndex)
  }

const fetcher = async (url: string): Promise<ArticleRepliesResponse> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('댓글을 불러오지 못했습니다.')
  const result = await res.json()
  return result.data
}

/** 댓글 생성 */
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
    console.error(`[useArticleComments/create] ${url}, error: ${res.status}`)
    throw new Error(result.message || '댓글 등록에 실패했습니다.')
  }
  return result
}

/** 댓글 삭제 */
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

/** 댓글 수정 */
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
    console.error(`[useArticleComments/modify] ${url}, error: ${res.status}`)
    throw new Error(result.message || '댓글 수정에 실패했습니다.')
  }

  return result
}

export const useArticleComments = () => {
  const { showToast } = useAppToast()
  const { requireAuthentication } = useAuthenticationCheck()
  const params = useParams()
  const articleId = params?.id

  if (!articleId) {
    throw new Error('articleId is required')
  }

  // 댓글 목록 불러오기
  const { data, setSize, mutate, error, isLoading, isValidating } =
    useSWRInfinite<ArticleRepliesResponse>(getKey(+articleId), fetcher)
  const hasMore =
    Array.isArray(data) && data.length > 0
      ? data[data.length - 1].hasNext
      : false

  const next = () => setSize((size) => size + 1)

  /** 댓글 생성 */
  const {
    trigger: triggerCreate,
    isMutating: isCreatingComment,
    error: createCommentError,
  } = useSWRMutation(
    AppClientApiEndpoint.createArticleComment(),
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
        mutate()
        onSuccess?.()
      } catch (e) {
        showToast('댓글 등록에 실패했습니다.')
        onError?.()
      }
    },
  )

  /** 댓글 삭제 */
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
      mutate()
      onSuccess?.()
    } catch (e) {
      showToast('댓글 삭제에 실패했습니다.')
      onError?.()
    }
  }

  /** 댓글 수정 */
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
        mutate()
        onSuccess?.()
      } catch (e) {
        console.error(e)
        showToast('댓글 수정에 실패했습니다.')
        onError?.()
      }
    },
  )

  return {
    data,
    next,
    error,
    isLoading,
    isValidating,
    hasMore,
    createComment,
    isCreatingComment,
    createCommentError,
    deleteComment,
    isDeletingComment,
    deleteCommentError,
    modifyComment,
    isModifyingComment,
    modifyCommentError,
  }
}
