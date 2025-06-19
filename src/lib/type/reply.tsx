export interface Reply {
  replyId: number
  userId: number
  nickname: string
  email: string
  comment: string
  createdAt: Date
  updatedAt: Date
}

export interface ArticleReply {
  id: number
  articleId: number
  userno: number
  content: string
  nickname: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}
export interface ArticleRepliesResponse {
  comments: ArticleReply[]
  hasNext: boolean
}
export interface RepliesResponse {
  comments: Reply[]
  hasNext: boolean
}
