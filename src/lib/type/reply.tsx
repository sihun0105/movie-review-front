export type Reply = {
  id: number
  userno: number
  nickname: string
  content: string
  updatedAt: Date
  createdAt: Date
  avatar?: string
}
export interface ArticleRepliesResponse {
  comments: Reply[]
  hasNext: boolean
}
export interface RepliesResponse {
  comments: Reply[]
  hasNext: boolean
}
