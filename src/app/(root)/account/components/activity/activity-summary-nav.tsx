import { UserActivitySummary, UserActivityType } from '@/modules/user-activity'

const metrics = [
  { type: 'comments', key: 'articleCommentCount', label: '작성 댓글' },
  { type: 'ratings', key: 'movieRatingCount', label: '영화 평가' },
  { type: 'articles', key: 'articleCount', label: '작성 게시글' },
  { type: 'likes', key: 'receivedLikeCount', label: '받은 좋아요' },
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
    <div className="grid grid-cols-4 border-y border-border bg-background">
      {metrics.map(({ type, key, label }, index) => {
        const active = selected === type
        return (
          <button
            key={type}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(type)}
            className={`min-w-0 px-1 py-4 text-center transition-colors ${
              index > 0 ? 'border-l border-border' : ''
            } ${active ? 'bg-foreground text-background' : 'hover:bg-accent'}`}
          >
            <span className="block font-mono text-[22px] font-bold leading-none">
              {isLoading ? (
                <span className="inline-block h-5 w-7 animate-pulse bg-secondary" />
              ) : (
                (summary?.[key] ?? 0).toLocaleString('ko-KR')
              )}
            </span>
            <span
              className={`mt-2 block truncate text-[11px] sm:text-[12px] ${
                active ? 'text-background/75' : 'text-muted-foreground'
              }`}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
