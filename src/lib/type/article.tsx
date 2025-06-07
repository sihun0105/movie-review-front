export interface Article {
  id: string
  title: string
  content: string
  author: string
  likeCount: number
  dislikeCount: number
  commentCount: number
}

export interface ArticleResponse {
  articles: Article[]
  hasNext: boolean
}
