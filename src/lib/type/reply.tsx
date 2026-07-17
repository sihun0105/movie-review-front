export type Reply = {
  id: number
  userno: number
  nickname: string
  content: string
  updatedAt: Date
  createdAt: Date
  avatar?: string
  parentId?: number
  replies?: Reply[]
}
export interface ArticleRepliesResponse {
  comments: Reply[]
  totalCount: number
  hasNext: boolean
}
export interface RepliesResponse {
  comments: Reply[]
  hasNext: boolean
}
