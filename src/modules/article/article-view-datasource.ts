import { ArticleViewBackendApiEndpoint } from '@/config/article-view-backend-api-endpoint'

export class ArticleViewDatasource {
  async recordArticleView(articleId: string, viewerKey: string) {
    const response = await fetch(
      ArticleViewBackendApiEndpoint.record(Number(articleId)),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ viewerKey }),
        cache: 'no-cache',
      },
    )
    if (!response.ok) throw new Error('조회수를 기록할 수 없습니다.')
    return response.json()
  }
}
