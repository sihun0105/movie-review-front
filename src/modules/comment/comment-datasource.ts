import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'

export class CommentDatasource {
  private token?: string
  constructor(token?: string) {
    this.token = token
  }
  async getCommentList(id: string) {
    const res = await fetch(AppBackEndApiEndpoint.getCommentList(+id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      cache: 'no-cache',
    })
    if (!res.ok) {
      throw new Error('댓글 리스트를 받아 올 수 없습니다.')
    }
    return res.json()
  }
  async createComment(id: string, comment: string) {
    const res = await fetch(AppBackEndApiEndpoint.createNewComment(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      cache: 'no-cache',
      body: JSON.stringify({
        comment,
        movieId: +id,
      }),
    })
    if (!res.ok) {
      throw new Error('댓글을 작성할 수 없습니다.')
    }
    return res.json()
  }

  async deleteComment(id: string) {
    const res = await fetch(AppBackEndApiEndpoint.deleteComment(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      cache: 'no-cache',
    })
    if (!res.ok) {
      throw new Error('댓글을 삭제할 수 없습니다.')
    }
    return res.json()
  }
}
