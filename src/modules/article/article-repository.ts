import { Article } from '@/lib/type'
import { ArticleDatasource } from './article-datasource'
import { assertArticle } from './article-entity'

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
    const data = await this.datasource.listArticles(page, pageSize)
    console.log('listArticles data', data)
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
    const data = await this.datasource.getArticle(id)
    return this.convertUnknownToArticle(data)
  }

  async createArticle(
    article: Omit<
      Article,
      'id' | 'likeCount' | 'dislikeCount' | 'commentCount' | 'author'
    >,
  ): Promise<Article> {
    const data = await this.datasource.createArticle(article)
    return this.convertUnknownToArticle(data)
  }

  async updateArticle(id: string, article: Partial<Article>): Promise<Article> {
    const data = await this.datasource.updateArticle(id, article)
    return this.convertUnknownToArticle(data)
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
      likeCount: unknown.likeCount,
      dislikeCount: unknown.dislikeCount,
      commentCount: unknown.commentCount,
    }
    assertArticle(result)
    return result
  }
}
