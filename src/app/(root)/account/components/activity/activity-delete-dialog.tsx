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
import { DeletableActivityItem } from '@/modules/user-activity'

const labels = {
  comment: '댓글',
  rating: '평점',
  article: '게시글',
} as const

interface Props {
  item: DeletableActivityItem | null
  isDeleting: boolean
  onOpenChange: (_open: boolean) => void
  onConfirm: () => void
}

export default function ActivityDeleteDialog({
  item,
  isDeleting,
  onOpenChange,
  onConfirm,
}: Props) {
  const label = item ? labels[item.type] : '활동'
  return (
    <AlertDialog open={Boolean(item)} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[calc(100vw-2rem)] rounded-lg sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{label}을 삭제할까요?</AlertDialogTitle>
          <AlertDialogDescription>
            삭제한 {label}은 목록과 집계에서 제외됩니다.
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
