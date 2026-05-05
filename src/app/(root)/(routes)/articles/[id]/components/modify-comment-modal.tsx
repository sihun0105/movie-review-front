'use client'

import {
  AlertDialog,
  AlertDialogContent,
} from '@/components/ui/alert-dialog'
import { FunctionComponent, useEffect, useRef } from 'react'
import { useModifyCommentModalContext } from '../hooks/use-modify-comment-context'
import { useModifyCommentFormContext } from '../hooks/modify-comment-context'
import { useArticleComments } from '../hooks/use-article-comments'
import { useModifyArticleComment } from '../hooks/use-modify-article-comment'

const ModifyCommentModal: FunctionComponent = () => {
  const { open, setOpen, replyId } = useModifyCommentModalContext()
  const { form } = useModifyCommentFormContext()
  const { mutate } = useArticleComments()
  const { modifyComment, isModifyingComment } = useModifyArticleComment(mutate)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { ref: registerRef, ...registerProps } = form.register('comment')

  useEffect(() => {
    if (open) setTimeout(() => textareaRef.current?.focus(), 80)
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    form.handleSubmit((data) => {
      modifyComment(
        { comment: data.comment, commentId: replyId },
        { onSuccess: () => { setOpen(false); form.reset() } },
      )
    })(e)
  }

  const comment = form.watch('comment')

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="gap-0 border border-border bg-card p-0 shadow-2xl sm:max-w-[420px]">
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-[15px] font-semibold text-foreground">댓글 수정</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="닫기"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit}>
          <div className="px-5 py-4">
            <textarea
              ref={(el) => { registerRef(el); textareaRef.current = el }}
              rows={4}
              placeholder="댓글을 입력해주세요."
              {...registerProps}
              className="w-full resize-none rounded-md border border-input bg-background px-3.5 py-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
            />
            {form.formState.errors.comment && (
              <p className="mt-1.5 text-[12px] text-destructive">
                {form.formState.errors.comment.message}
              </p>
            )}
          </div>

          {/* 푸터 버튼 */}
          <div className="flex gap-2 border-t border-border px-5 py-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-10 flex-1 rounded-md border border-border text-[13px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isModifyingComment || !comment?.trim()}
              className="h-10 flex-1 rounded-md bg-primary text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {isModifyingComment ? '수정 중...' : '수정 완료'}
            </button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { ModifyCommentModal }
