export interface CreateCommentArgs {
  movieId: string
  comment: string
  parentId?: number
}

export interface DeleteCommentArgs {
  commentId: number
}

export interface ModifyCommentArgs extends DeleteCommentArgs {
  comment: string
}

export const createCommentFetcher = async (
  url: string,
  { arg }: { arg: CreateCommentArgs },
) => {
  const formData = new FormData()
  formData.append('movieId', arg.movieId)
  formData.append('comment', arg.comment)
  if (arg.parentId) formData.append('parentId', String(arg.parentId))

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
    cache: 'no-cache',
  })
  const result = await res.json()
  if (!res.ok) throw new Error(result.message || '댓글 등록에 실패했습니다.')
  return result
}

export const deleteCommentFetcher = async (
  url: string,
  { arg }: { arg: DeleteCommentArgs },
) => {
  const formData = new FormData()
  formData.append('commentId', String(arg.commentId))
  const res = await fetch(url, { method: 'DELETE', body: formData })
  const result = await res.json()
  if (!res.ok) throw new Error(result.message || '댓글 삭제에 실패했습니다.')
  return result
}

export const modifyCommentFetcher = async (
  url: string,
  { arg }: { arg: ModifyCommentArgs },
) => {
  const formData = new FormData()
  formData.append('commentId', String(arg.commentId))
  formData.append('comment', arg.comment)
  const res = await fetch(url, {
    method: 'PUT',
    body: formData,
    cache: 'no-cache',
  })
  const result = await res.json()
  if (!res.ok) throw new Error(result.message || '댓글 수정에 실패했습니다.')
  return result
}
