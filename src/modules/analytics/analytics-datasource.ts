import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import type { AnalyticsSummary } from './analytics-entity'

export class AnalyticsDatasource {
  private readonly token: string

  constructor(token: string) {
    this.token = token
  }

  async getSummary(): Promise<AnalyticsSummary> {
    const response = await fetch(AppBackEndApiEndpoint.getAnalyticsSummary(), {
      headers: { Authorization: `Bearer ${this.token}` },
      cache: 'no-store',
    })
    if (!response.ok) {
      const error = new Error('통계 정보를 불러오지 못했습니다.')
      Object.assign(error, { status: response.status })
      throw error
    }
    return response.json()
  }
}
