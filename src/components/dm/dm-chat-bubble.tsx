import { cn } from '@/lib/utils'

interface DmChatBubbleProps {
  content: string
  isMine: boolean
  senderName?: string
  createdAt?: string | Date
  showAvatar?: boolean
  avatarInitial?: string
}

function formatTime(input?: string | Date): string {
  if (!input) return ''
  const d = typeof input === 'string' ? new Date(input) : input
  if (isNaN(d.getTime())) return ''
  return d.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function DmChatBubble({
  content,
  isMine,
  senderName,
  createdAt,
  showAvatar = true,
  avatarInitial,
}: DmChatBubbleProps) {
  const time = formatTime(createdAt)
  return (
    <div
      className={cn(
        'mb-1.5 flex gap-1.5',
        isMine ? 'justify-end' : 'justify-start',
      )}
    >
      {!isMine && (
        <span
          aria-hidden
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center self-end rounded-full border border-dm-line-2 bg-dm-surface-2 text-[10px] font-bold text-dm-text',
            !showAvatar && 'opacity-0',
          )}
        >
          {avatarInitial ?? senderName?.charAt(0).toUpperCase() ?? '?'}
        </span>
      )}
      <div className="flex max-w-[72%] flex-col gap-0.5">
        {!isMine && senderName && showAvatar && (
          <span className="px-1 text-[10px] text-dm-text-faint">
            {senderName}
          </span>
        )}
        <div
          className={cn(
            'break-keep px-3 py-2 text-[13px] leading-[1.45]',
            isMine
              ? 'rounded-[14px_4px_14px_14px] bg-dm-red text-white'
              : 'rounded-[4px_14px_14px_14px] border border-dm-line-2 bg-dm-surface-2 text-dm-text',
          )}
        >
          {content}
        </div>
        {time && (
          <span
            className={cn(
              'px-1 font-dm-mono text-[9px] text-dm-text-faint',
              isMine ? 'text-right' : 'text-left',
            )}
          >
            {time}
          </span>
        )}
      </div>
    </div>
  )
}
