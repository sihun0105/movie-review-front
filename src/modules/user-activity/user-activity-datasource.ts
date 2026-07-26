import { UserActivityClientApiEndpoint } from '@/config/user-activity-client-api-endpoint'
import {
  UserActivityRequestError,
  type UserActivitySummary,
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
}
