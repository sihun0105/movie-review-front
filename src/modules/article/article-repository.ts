import { Article, LikeState, Reply } from '@/lib/type'
import { ArticleDatasource } from './article-datasource'
import { assertArticle, assertArticleComment } from './article-entity'
import console from 'console'

export class ArticleRepository {
  private datasource: ArticleDatasource

  constructor(
    private token?: string,
    datasource?: ArticleDatasource,
  ) {
    this.datasource = datasource ?? new ArticleDatasource(token)
  }

  async listArticles(
    page = 1,
    pageSize = 10,
  ): Promise<{ articles: Article[]; hasNext: boolean }> {
    console.log('listArticles called with page:', page, 'pageSize:', pageSize)

    const data = await this.datasource.listArticles(page, pageSize)
    if (!data.articles) {
      console.log('data.articles is undefined')
      return { articles: [], hasNext: false }
    }

    const articles = data.articles.map((item: any) =>
      this.convertUnknownToArticle(item),
    )
    const hasNext = data.hasNext ?? false

    return { articles, hasNext }
  }

  async getArticle(id: string): Promise<Article> {
    try {
      const data = await this.datasource.getArticle(id)
      if (!data || !data.article) {
        throw new Error('존재하지 않는 게시글입니다.')
      }
      return this.convertUnknownToArticle(data.article)
    } catch (error: any) {
      throw new Error('존재하지 않는 게시글입니다.')
    }
  }

  async createArticle(
    article: Omit<
      Article,
      | 'id'
      | 'likeCount'
      | 'dislikeCount'
      | 'commentCount'
      | 'author'
      | 'userno'
      | 'createdAt'
      | 'updatedAt'
      | 'deletedAt'
    >,
  ): Promise<Article> {
    const data = await this.datasource.createArticle(article)
    return this.convertUnknownToArticle(data.article)
  }

  async updateArticle(id: string, article: Partial<Article>): Promise<Article> {
    const data = await this.datasource.updateArticle(id, article)
    return this.convertUnknownToArticle(data.article)
  }

  async deleteArticle(id: string): Promise<void> {
    await this.datasource.deleteArticle(id)
  }

  private convertUnknownToArticle(unknown: any): Article {
    const result: Article = {
      id: unknown.id + '',
      title: unknown.title,
      content: unknown.content,
      author: unknown.author,
      userno: unknown.userno,
      likeCount: unknown.likeCount,
      dislikeCount: unknown.dislikeCount,
      commentCount: unknown.commentCount,
      createdAt: unknown.createdAt,
      updatedAt: unknown.updatedAt,
      deletedAt: unknown.deletedAt,
    }
    assertArticle(result)
    return result
  }

  async getArticleLikes(id: string): Promise<{
    likes: number
    dislikes: number
  }> {
    const data = await this.datasource.getArticle(id)
    return {
      likes: data.article.likeCount,
      dislikes: data.article.dislikeCount,
    }
  }
  async updateArticleLike(
    id: string,
    state: LikeState,
  ): Promise<{
    likes: number
    dislikes: number
  }> {
    const data = await this.datasource.updateArticleLike(id, state)
    console.log('updateArticleLike data:', data)
    return {
      likes: data.likes,
      dislikes: data.dislikes,
    }
  }
  async createComment(articleId: string, comment: string): Promise<Reply> {
    const data = await this.datasource.createComment(articleId, comment)
    return this.convertUnknownToComment(data)
  }
  private convertUnknownToComment(unknown: any): Reply {
    const result: Reply = {
      id: unknown.id,
      userno: unknown.userno,
      content: unknown.content,
      nickname: unknown.nickname,
      avatar: unknown.avatar,
      createdAt: new Date(unknown.createdAt),
      updatedAt: new Date(unknown.updatedAt),
    }
    assertArticleComment(result)
    return result
  }

  async getCommentList(
    articleId: string,
    page?: number,
  ): Promise<{ comments: Reply[]; hasNext: boolean; totalCount: number }> {
    const data = await this.datasource.getCommentList(articleId, page ?? 0)
    const comments = data?.comments?.map((item: any) =>
      this.convertUnknownToComment(item),
    )
    const hasNext = data.hasNext ?? false
    return { comments, hasNext, totalCount: data.totalCount ?? 0 }
  }

  async deleteComment(id: string) {
    const data = await this.datasource.deleteComment(id)
    return data
  }
  async modifyComment(id: string, comment: string): Promise<Reply> {
    console.log('modifyComment called with id:', id, 'comment:', comment)
    console.log('modifyComment id:', id, 'comment:', comment)
    const data = await this.datasource.modifyComment(id, comment)
    console.log('modifyComment data:', data)
    return data
  }
}
