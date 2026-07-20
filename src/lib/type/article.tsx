export interface Article {
  id: string
  title: string
  userno: number
  content: string
  author: string
  likeCount: number
  dislikeCount: number
  commentCount: number
  viewCount: number
  createdAt: string
  updatedAt?: string
  deletedAt?: string
}

export interface ArticleResponse {
  articles: Article[]
  hasNext: boolean
}
export type LikeState = 'like' | 'dislike'
