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
    return data.map((item: any) => {
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
      id: unknown.id,
      userId: unknown.user.id,
      userName: unknown.user.nickname,
      comment: unknown.comment,
      createdAt: new Date(unknown.createdAt),
      updatedAt: new Date(unknown.updatedAt),
    } as Comment
    assertComment(result)
    return result
  }
}
