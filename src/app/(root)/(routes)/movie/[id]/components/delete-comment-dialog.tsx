'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface DeleteCommentDialogProps {
  open: boolean
  hasReplies: boolean
  isDeleting: boolean
  onOpenChange: (_open: boolean) => void
  onConfirm: () => void
}

export function DeleteCommentDialog({
  open,
  hasReplies,
  isDeleting,
  onOpenChange,
  onConfirm,
}: DeleteCommentDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[calc(100vw-2rem)] rounded-lg sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>댓글을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            {hasReplies
              ? '답글이 있어 댓글 내용만 “삭제된 댓글입니다.”로 표시됩니다.'
              : '삭제한 댓글은 되돌릴 수 없습니다.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>취소</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={(event) => {
              event.preventDefault()
              onConfirm()
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
