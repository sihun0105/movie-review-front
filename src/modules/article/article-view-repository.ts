import { ArticleViewResult, isArticleViewResult } from './article.entity'
import { ArticleViewDatasource } from './article-view-datasource'

export class ArticleViewRepository {
  private readonly datasource: ArticleViewDatasource

  constructor(datasource = new ArticleViewDatasource()) {
    this.datasource = datasource
  }

  async recordArticleView(
    articleId: string,
    viewerKey: string,
  ): Promise<ArticleViewResult> {
    const result = await this.datasource.recordArticleView(articleId, viewerKey)
    if (!isArticleViewResult(result)) {
      throw new Error('올바르지 않은 조회수 응답입니다.')
    }
    return result
  }
}
