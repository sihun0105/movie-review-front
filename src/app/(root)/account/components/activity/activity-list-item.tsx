import { Poster, paletteForMovie } from '@/components/dm'
import {
  DeletableActivityItem,
  UserActivityItem,
} from '@/modules/user-activity'
import {
  ChevronRight,
  FileText,
  Heart,
  MessageCircle,
  Star,
  Trash2,
} from 'lucide-react'
import Link from 'next/link'

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(
    new Date(value),
  )

const isDeletable = (item: UserActivityItem): item is DeletableActivityItem =>
  item.type !== 'like'

const getHref = (item: UserActivityItem) => {
  if (item.type === 'rating') return `/movie/${item.movieCd}`
  if (item.type === 'comment') {
    return item.targetType === 'movie'
      ? `/movie/${item.targetId}`
      : `/articles/${item.targetId}`
  }
  return `/articles/${item.articleId}`
}

interface Props {
  item: UserActivityItem
  onDelete: (_item: DeletableActivityItem) => void
}

export default function ActivityListItem({ item, onDelete }: Props) {
  const title =
    item.type === 'comment'
      ? item.targetTitle
      : item.type === 'rating'
        ? item.movieTitle
        : item.title
  const timestamp = item.type === 'rating' ? item.ratedAt : item.createdAt

  return (
    <div className="flex min-h-[88px] items-center gap-3 border-b border-border py-3.5 last:border-b-0">
      <Link
        href={getHref(item)}
        className="flex min-w-0 flex-1 items-center gap-3"
      >
        {item.type === 'rating' ? (
          <div className="w-12 shrink-0">
            <Poster
              title={item.movieTitle}
              imageUrl={item.poster}
              palette={paletteForMovie(item.movieCd)}
              className="w-12"
            />
          </div>
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            {item.type === 'comment' ? (
              <MessageCircle className="h-4 w-4" />
            ) : item.type === 'like' ? (
              <Heart className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 truncate text-[14px] font-semibold text-foreground">
            {title}
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          </p>
          {item.type === 'comment' && (
            <>
              <span className="mt-1 block text-[10px] font-medium text-muted-foreground">
                {item.targetType === 'movie' ? '영화 댓글' : '게시글 댓글'}
              </span>
              <p className="mt-0.5 truncate text-[13px] text-muted-foreground">
                &ldquo;{item.content}&rdquo;
              </p>
            </>
          )}
          {item.type === 'rating' && (
            <p className="mt-1 flex items-center gap-1 text-[13px] font-medium text-foreground">
              <Star className="h-3.5 w-3.5 fill-current" /> {item.score}점
            </p>
          )}
          {item.type === 'article' && (
            <p className="mt-1 text-[12px] text-muted-foreground">
              좋아요 {item.likeCount} · 댓글 {item.commentCount}
            </p>
          )}
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">
            {formatDate(timestamp)}
          </p>
        </div>
        {item.type === 'like' && (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[12px] font-bold text-primary">
            <Heart className="h-3 w-3 fill-current" /> 좋아요 {item.likeCount}
          </span>
        )}
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
