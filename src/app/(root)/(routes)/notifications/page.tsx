'use client'

import { useRouter } from 'next/navigation'
import useSWR, { mutate } from 'swr'
import { cn } from '@/lib/utils'
import type { NotificationItem, NotificationListResponse } from '@/modules/notification'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function typeLabel(type: string) {
  if (type === 'match_apply') return '매칭 신청'
  if (type === 'chat_message') return '채팅'
  return '알림'
}

function typeHref(item: NotificationItem) {
  if (item.type === 'match_apply' && item.targetId) return `/match/${item.targetId}`
  if (item.type === 'chat_message' && item.targetId) return `/chat`
  return null
}

export default function NotificationsPage() {
  const router = useRouter()
  const { data, isLoading } = useSWR<NotificationListResponse>(
    '/api/notifications',
    fetcher,
  )

  const handleRead = async (item: NotificationItem) => {
    if (!item.isRead) {
      await fetch(`/api/notifications/${item.id}`, { method: 'PATCH' })
      mutate('/api/notifications')
      mutate('/api/notifications/unread-count')
    }
    const href = typeHref(item)
    if (href) router.push(href)
  }

  const handleReadAll = async () => {
    await fetch('/api/notifications/read-all', { method: 'PATCH' })
    mutate('/api/notifications')
    mutate('/api/notifications/unread-count')
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h1 className="text-[15px] font-semibold text-foreground">알림</h1>
        {(data?.items?.some((n) => !n.isRead)) && (
          <button
            onClick={handleReadAll}
            className="font-mono text-[11px] text-muted-foreground hover:text-foreground"
          >
            모두 읽음
          </button>
        )}
      </div>

      {isLoading && (
        <div className="py-12 text-center font-mono text-[12px] text-muted-foreground">
          불러오는 중...
        </div>
      )}

      {!isLoading && (!data?.items?.length) && (
        <div className="py-16 text-center text-muted-foreground">
          <p className="text-[14px]">알림이 없습니다.</p>
        </div>
      )}

      <ul>
        {data?.items?.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => handleRead(item)}
              className={cn(
                'w-full border-b border-border px-4 py-3.5 text-left transition-colors hover:bg-accent',
                !item.isRead && 'bg-accent/40',
              )}
            >
              <div className="flex items-start gap-3">
                <span className={cn(
                  'mt-0.5 shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[9px] font-medium',
                  item.type === 'match_apply'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground',
                )}>
                  {typeLabel(item.type)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-0.5 truncate text-[12px] text-muted-foreground">
                    {item.body}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground/60">
                    {new Date(item.createdAt).toLocaleString('ko-KR', {
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {!item.isRead && (
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
