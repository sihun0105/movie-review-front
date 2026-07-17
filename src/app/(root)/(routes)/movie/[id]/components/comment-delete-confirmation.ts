interface DeleteCommentOptions {
  onSuccess?: () => void
}

type DeleteComment = (
  _args: { commentId: number },
  _options?: DeleteCommentOptions,
) => void

export function confirmCommentDeletion(
  commentId: number,
  deleteComment: DeleteComment,
  closeDialog: () => void,
) {
  deleteComment({ commentId }, { onSuccess: closeDialog })
}
