import { Reply } from '@/lib/type'
import { CommentDatasource } from './comment-datasource'
import { assertComment } from './comment-entity'

export class CommentRepository {
  private datasource: CommentDatasource
  constructor(
    private token?: string,
    datasource?: CommentDatasource,
  ) {
    this.datasource = datasource ?? new CommentDatasource(token ?? undefined)
  }

  async getCommentList(
    id: string,
    page?: number,
  ): Promise<{ comments: Reply[]; hasNext: boolean }> {
    const data = await this.datasource.getCommentList(id, page ?? 0)

    if (!data.replies) {
      console.log('data.replies is undefined')
      return { comments: [], hasNext: false }
    }
    const comments = data.replies.map((item: any) =>
      this.convertUnkownToComment(item),
    )
    const hasNext = data.hasNext ?? false

    return { comments, hasNext }
  }

  async createComment(id: string, comment: string): Promise<Reply> {
    const data = await this.datasource.createComment(id, comment)
    return data
  }

  async deleteComment(id: string) {
    const data = await this.datasource.deleteComment(id)
    return data
  }
  async modifyComment(id: string, comment: string): Promise<Reply> {
    const data = await this.datasource.modifyComment(id, comment)
    return data
  }
  private convertUnkownToComment(unknown: any): Reply {
    const result = {
      replyId: unknown.replyId,
      userId: unknown.userId,
      nickname: unknown.nickname,
      email: unknown.email,
      comment: unknown.comment,
      createdAt: new Date(unknown.createdAt),
      updatedAt: new Date(unknown.updatedAt),
    } as Reply
    assertComment(result)
    return result
  }
}
