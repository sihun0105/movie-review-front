export interface Reply {
  replyId: number
  userId: number
  nickname: string
  email: string
  comment: string
  createdAt: Date
  updatedAt: Date
}
export interface RepliesResponse {
  comments: Reply[]
  hasNext: boolean
}
