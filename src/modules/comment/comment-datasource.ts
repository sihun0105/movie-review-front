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
    if (res.status !== 200) {
      throw new Error('댓글 리스트를 받아 올 수 없습니다.')
    }
    return res.json()
  }
}
