import console from 'console'
import { CommentDatasource } from './comment-datasource'
import { Comment, assertComment } from './comment-entity'

export class CommentRepository {
  private datasource: CommentDatasource
  constructor(
    private token?: string,
    datasource?: CommentDatasource,
  ) {
    this.datasource = datasource ?? new CommentDatasource(token)
  }

  async getCommentList(id: string): Promise<Comment[]> {
    const data = await this.datasource.getCommentList(id)
    if (data.replys === undefined) {
      console.log('data.replys is undefined')
      return []
    }
    return data.replys.map((item: any) => {
      return this.convertUnkownToComment(item)
    })
  }

  async createComment(id: string, comment: string): Promise<Comment> {
    const data = await this.datasource.createComment(id, comment)
    return data
  }

  async deleteComment(id: string) {
    const data = await this.datasource.deleteComment(id)
    return data
  }
  private convertUnkownToComment(unknown: any): Comment {
    const result = {
      id: unknown.replyId,
      userId: unknown.userId,
      userName: unknown.nickname,
      comment: unknown.comment,
      createdAt: new Date(unknown.createdAt),
      updatedAt: new Date(unknown.updatedAt),
    } as Comment
    assertComment(result)
    return result
  }
}
