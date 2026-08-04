import { UserActivityClientApiEndpoint } from '@/config/user-activity-client-api-endpoint'
import {
  DeletableActivityItem,
  UserActivityRequestError,
  UserActivityPage,
  type UserActivitySummary,
  UserActivityType,
} from './user-activity-entity'

export class UserActivityDatasource {
  async getSummary(): Promise<UserActivitySummary> {
    const response = await fetch(UserActivityClientApiEndpoint.getSummary(), {
      cache: 'no-store',
    })
    if (!response.ok) {
      throw new UserActivityRequestError(response.status)
    }
    return response.json()
  }

  async getActivity(
    type: UserActivityType,
    page: number,
  ): Promise<UserActivityPage> {
    const response = await fetch(
      UserActivityClientApiEndpoint.getActivity(type, page),
      { cache: 'no-store' },
    )
    if (!response.ok) throw new UserActivityRequestError(response.status)
    return response.json()
  }

  async deleteItem(item: DeletableActivityItem): Promise<void> {
    if (item.type === 'rating') return this.deleteRating(item.movieCd)
    if (item.type === 'article') return this.deleteArticle(item.articleId)
    return this.deleteComment(item.id)
  }

  async deleteRating(movieCd: number): Promise<void> {
    const response = await fetch(
      UserActivityClientApiEndpoint.deleteRating(movieCd),
      { method: 'DELETE' },
    )
    if (!response.ok) throw new UserActivityRequestError(response.status)
  }

  private async deleteArticle(articleId: number): Promise<void> {
    const response = await fetch(
      UserActivityClientApiEndpoint.deleteArticle(articleId),
      { method: 'DELETE' },
    )
    if (!response.ok) throw new UserActivityRequestError(response.status)
  }

  private async deleteComment(commentId: number): Promise<void> {
    const form = new FormData()
    form.set('commentId', String(commentId))
    const response = await fetch(
      UserActivityClientApiEndpoint.deleteComment(commentId),
      { method: 'DELETE', body: form },
    )
    if (!response.ok) throw new UserActivityRequestError(response.status)
  }
}
