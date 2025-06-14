import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import { Article, LikeState } from '@/lib/type'

export class ArticleDatasource {
  private token?: string

  constructor(token?: string) {
    this.token = token
  }

  private getAuthHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
  }

  async listArticles(page: number, pageSize: number = 10) {
    const res = await fetch(
      AppBackEndApiEndpoint.listArticles(page, pageSize),
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
        cache: 'no-cache',
      },
    )
    if (!res.ok) throw new Error('게시글 목록을 가져올 수 없습니다.')
    return res.json()
  }

  async getArticle(id: string) {
    const res = await fetch(AppBackEndApiEndpoint.getArticle(+id), {
      method: 'GET',
      headers: this.getAuthHeaders(),
      cache: 'no-cache',
    })
    if (!res.ok) throw new Error('게시글을 가져올 수 없습니다.')
    return res.json()
  }

  async createArticle(
    article: Omit<
      Article,
      'id' | 'likeCount' | 'dislikeCount' | 'commentCount' | 'author'
    >,
  ) {
    const res = await fetch(AppBackEndApiEndpoint.createArticle(), {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(article),
    })

    if (!res.ok) throw new Error('게시글을 생성할 수 없습니다.')
    return res.json()
  }

  async updateArticle(id: string, article: Partial<Article>) {
    const res = await fetch(AppBackEndApiEndpoint.updateArticle(+id), {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(article),
    })

    if (!res.ok) throw new Error('게시글을 수정할 수 없습니다.')
    return res.json()
  }

  async deleteArticle(id: string) {
    const res = await fetch(AppBackEndApiEndpoint.deleteArticle(+id), {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    })

    if (!res.ok) throw new Error('게시글을 삭제할 수 없습니다.')
  }

  async getArticleLikes(id: string) {
    const res = await fetch(AppBackEndApiEndpoint.getLikeArticle(+id), {
      method: 'GET',
      headers: this.getAuthHeaders(),
      cache: 'no-cache',
    })

    if (!res.ok) throw new Error('게시글 좋아요를 가져올 수 없습니다.')
    return res.json()
  }
  async updateArticleLike(id: string, state: LikeState) {
    const backendState = state === 'like' ? 'LIKE' : 'DISLIKE'
    const res = await fetch(AppBackEndApiEndpoint.updateLikeArticle(+id), {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ backendState }),
      cache: 'no-cache',
    })

    if (!res.ok) throw new Error('게시글 좋아요를 업데이트할 수 없습니다.')
    return res.json()
  }
}
