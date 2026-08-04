import {
  DeletableActivityItem,
  UserActivityItem,
} from '@/modules/user-activity'
import { ChevronRight, Film, Heart, Star, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(
    new Date(value),
  )

const isDeletable = (item: UserActivityItem): item is DeletableActivityItem =>
  item.type !== 'like'

interface Props {
  item: UserActivityItem
  onDelete: (_item: DeletableActivityItem) => void
}

export default function ActivityListItem({ item, onDelete }: Props) {
  const href =
    item.type === 'rating'
      ? `/movie/${item.movieCd}`
      : `/articles/${item.articleId}`

  return (
    <div className="flex min-h-[78px] items-center gap-3 border-b border-border px-4 py-3 last:border-b-0">
      <Link href={href} className="flex min-w-0 flex-1 items-center gap-3">
        {item.type === 'rating' && (
          <div className="relative h-14 w-10 shrink-0 overflow-hidden bg-secondary">
            {item.poster ? (
              <Image
                src={item.poster}
                alt={`${item.movieTitle} 포스터`}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <Film className="absolute inset-0 m-auto h-4 w-4 text-muted-foreground" />
            )}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 truncate text-[13px] font-semibold text-foreground">
            {item.type === 'comment' ? item.articleTitle : null}
            {item.type === 'rating' ? item.movieTitle : null}
            {item.type === 'article' || item.type === 'like'
              ? item.title
              : null}
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          </p>
          {item.type === 'comment' && (
            <p className="mt-1 truncate text-[13px] text-muted-foreground">
              &ldquo;{item.content}&rdquo;
            </p>
          )}
          {item.type === 'rating' && (
            <p className="mt-1 flex items-center gap-1 text-[13px] text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-current" /> {item.score}점
            </p>
          )}
          {(item.type === 'article' || item.type === 'like') && (
            <p className="mt-1 flex items-center gap-1 text-[12px] text-muted-foreground">
              <Heart className="h-3.5 w-3.5" /> 좋아요 {item.likeCount}
              {item.type === 'article' && ` · 댓글 ${item.commentCount}`}
            </p>
          )}
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">
            {formatDate(item.type === 'rating' ? item.ratedAt : item.createdAt)}
          </p>
        </div>
      </Link>
      {isDeletable(item) && (
        <button
          type="button"
          onClick={() => onDelete(item)}
          aria-label={`${item.type === 'rating' ? '평점' : item.type === 'comment' ? '댓글' : '게시글'} 삭제`}
          title="삭제"
          className="shrink-0 p-2 text-muted-foreground transition-colors hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
