'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { UserActivityType } from '@/modules/user-activity'
import { RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useAccountActivity } from '../../hooks/use-account-activity'
import ActivityDeleteDialog from './activity-delete-dialog'
import ActivityListItem from './activity-list-item'

const emptyMessages: Record<UserActivityType, string> = {
  comments: '아직 작성한 댓글이 없어요.',
  ratings: '아직 평가한 영화가 없어요.',
  articles: '아직 작성한 게시글이 없어요.',
  likes: '아직 받은 좋아요가 없어요.',
}

interface Props {
  type: UserActivityType
  onDeleted: () => void
}

export default function ActivityListPanel({ type, onDeleted }: Props) {
  const activity = useAccountActivity(type, onDeleted)

  return (
    <div className="border-b border-border bg-card">
      {activity.isLoading ? (
        <div className="space-y-3 px-4 py-4">
          {[0, 1, 2].map((item) => (
            <Skeleton key={item} className="h-14 w-full rounded-none" />
          ))}
        </div>
      ) : activity.error ? (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 px-4 py-5 text-[13px] text-destructive"
        >
          <span>활동 목록을 불러오지 못했어요.</span>
          <button
            type="button"
            onClick={activity.retry}
            aria-label="활동 목록 다시 불러오기"
            className="p-2"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      ) : activity.items.length === 0 ? (
        <p className="px-4 py-8 text-center text-[13px] text-muted-foreground">
          {emptyMessages[type]}
        </p>
      ) : (
        <div>
          {activity.items.map((item) => (
            <ActivityListItem
              key={
                item.type === 'comment'
                  ? `comment-${item.id}`
                  : item.type === 'rating'
                    ? `rating-${item.movieCd}`
                    : `${item.type}-${item.articleId}`
              }
              item={item}
              onDelete={activity.setDeleteTarget}
            />
          ))}
          {activity.hasNext && (
            <button
              type="button"
              onClick={activity.loadMore}
              disabled={activity.isLoadingMore}
              className="w-full border-t border-border py-3 text-[13px] font-semibold text-foreground disabled:text-muted-foreground"
            >
              {activity.isLoadingMore ? '불러오는 중...' : '더 보기'}
            </button>
          )}
        </div>
      )}
      {activity.deleteError && (
        <p role="alert" className="px-4 pb-3 text-[12px] text-destructive">
          {activity.deleteError}{' '}
          <Link href="/account" className="underline underline-offset-2">
            새로고침
          </Link>
        </p>
      )}
      <ActivityDeleteDialog
        item={activity.deleteTarget}
        isDeleting={activity.isDeleting}
        onOpenChange={(open) => !open && activity.setDeleteTarget(null)}
        onConfirm={activity.deleteItem}
      />
    </div>
  )
}
