export interface UserActivitySummary {
  articleCommentCount: number
  movieRatingCount: number
  articleCount: number
  receivedLikeCount: number
}

export type UserActivityType = 'comments' | 'ratings' | 'articles' | 'likes'

export interface CommentActivity {
  type: 'comment'
  id: number
  articleId: number
  articleTitle: string
  content: string
  createdAt: string
}

export interface RatingActivity {
  type: 'rating'
  movieCd: number
  movieTitle: string
  poster: string
  score: number
  ratedAt: string
}

export interface ArticleActivity {
  type: 'article'
  articleId: number
  title: string
  createdAt: string
  likeCount: number
  commentCount: number
}

export interface LikeActivity extends Omit<ArticleActivity, 'type'> {
  type: 'like'
}

export type UserActivityItem =
  | CommentActivity
  | RatingActivity
  | ArticleActivity
  | LikeActivity

export type DeletableActivityItem = Exclude<UserActivityItem, LikeActivity>

export interface UserActivityPage {
  items: UserActivityItem[]
  totalCount: number
  hasNext: boolean
}

export class UserActivityRequestError extends Error {
  readonly status: number

  constructor(status: number) {
    super('커뮤니티 활동을 불러오지 못했습니다.')
    this.status = status
  }
}
