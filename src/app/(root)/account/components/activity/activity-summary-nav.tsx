import { UserActivitySummary, UserActivityType } from '@/modules/user-activity'
import { FileText, Heart, MessageCircle, Star } from 'lucide-react'

const metrics = [
  {
    type: 'comments',
    key: 'articleCommentCount',
    label: '작성 댓글',
    icon: MessageCircle,
  },
  { type: 'ratings', key: 'movieRatingCount', label: '영화 평가', icon: Star },
  {
    type: 'articles',
    key: 'articleCount',
    label: '작성 게시글',
    icon: FileText,
  },
  {
    type: 'likes',
    key: 'receivedLikeCount',
    label: '받은 좋아요',
    icon: Heart,
  },
] as const

interface Props {
  summary?: UserActivitySummary
  selected: UserActivityType | null
  isLoading: boolean
  onSelect: (_type: UserActivityType) => void
}

export default function ActivitySummaryNav({
  summary,
  selected,
  isLoading,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-4 border-b border-border bg-background px-2 sm:px-3">
      {metrics.map(({ type, key, label, icon: Icon }) => {
        const active = selected === type
        return (
          <button
            key={type}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(type)}
            className={`min-w-0 border-b-2 px-1 py-3 text-center transition-colors ${
              active
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5 font-mono text-[20px] font-bold leading-none">
              <Icon className="h-3.5 w-3.5" />
              {isLoading ? (
                <span className="inline-block h-5 w-7 animate-pulse bg-secondary" />
              ) : (
                (summary?.[key] ?? 0).toLocaleString('ko-KR')
              )}
            </span>
            <span className="mt-1.5 block truncate text-[10px] sm:text-[11px]">
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
