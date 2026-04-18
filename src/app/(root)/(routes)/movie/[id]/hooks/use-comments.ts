'use client'

import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { useAppToast } from '@/hooks/use-app-toast'
import { useAuthenticationCheck } from '@/hooks/use-authentication-check'
import { RepliesResponse } from '@/lib/type'
import { useParams } from 'next/navigation'
import useSWRInfinite from 'swr/infinite'
import useSWRMutation from 'swr/mutation'

interface CreateCommentArgs {
  movieId: string
  comment: string
}

interface DeleteCommentArgs {
  commentId: number
}

interface ModifyCommentArgs {
  commentId: number
  comment: string
}

/** 댓글 목록 key */
const getKey =
  (movieId: number) =>
  (pageIndex: number, previousPageData: RepliesResponse | null) => {
    if (previousPageData && !previousPageData.hasNext) return null
    return AppClientApiEndpoint.getComments(movieId, pageIndex)
  }

const fetcher = async (url: string): Promise<RepliesResponse> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('댓글을 불러오지 못했습니다.')
  const result = await res.json()
  return result.data
}

/** 댓글 생성 */
const createCommentFetcher = async (
  url: string,
  { arg }: { arg: CreateCommentArgs },
) => {
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
    console.error(`[useComments/create] ${url}, error: ${res.status}`)
    throw new Error(result.message || '댓글 등록에 실패했습니다.')
  }

  return result
}

/** 댓글 삭제 */
const deleteCommentFetcher = async (
  url: string,
  { arg }: { arg: DeleteCommentArgs },
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
  { arg }: { arg: ModifyCommentArgs },
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
    console.error(`[useComments/modify] ${url}, error: ${res.status}`)
    throw new Error(result.message || '댓글 수정에 실패했습니다.')
  }

  return result
}

export const useComments = () => {
  const { showToast } = useAppToast()
  const { requireAuthentication } = useAuthenticationCheck()
  const params = useParams()
  const movieId = params?.id
  const commentId = params?.commentId
  if (!movieId) {
    throw new Error('movieId is required')
  }

  // 댓글 목록 불러오기
  const { data, setSize, mutate, error, isLoading, isValidating } =
    useSWRInfinite<RepliesResponse>(getKey(+movieId), fetcher)

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
    AppClientApiEndpoint.createNewComment(movieId + ''),
    createCommentFetcher,
  )

  const createComment = requireAuthentication(
    async (
      args: CreateCommentArgs,
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
    AppClientApiEndpoint.deleteCommnet(+movieId),
    deleteCommentFetcher,
  )

  const deleteComment = async (
    args: DeleteCommentArgs,
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
    AppClientApiEndpoint.modifyComment(+movieId),
    modifyCommentFetcher,
  )
  const modifyComment = requireAuthentication(
    async (
      args: ModifyCommentArgs,
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
