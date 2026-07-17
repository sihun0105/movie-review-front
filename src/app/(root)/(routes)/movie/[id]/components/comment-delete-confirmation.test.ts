import { describe, expect, it, vi } from 'vitest'
import { confirmCommentDeletion } from './comment-delete-confirmation'

describe('confirmCommentDeletion', () => {
  it('선택한 댓글을 삭제하고 성공한 뒤 다이얼로그를 닫는다', () => {
    const closeDialog = vi.fn()
    let succeed: (() => void) | undefined
    const deleteComment = vi.fn((_args, options) => {
      succeed = options.onSuccess
    })

    confirmCommentDeletion(27, deleteComment, closeDialog)

    expect(deleteComment).toHaveBeenCalledWith(
      { commentId: 27 },
      { onSuccess: closeDialog },
    )
    expect(closeDialog).not.toHaveBeenCalled()

    succeed?.()

    expect(closeDialog).toHaveBeenCalledOnce()
  })
})
