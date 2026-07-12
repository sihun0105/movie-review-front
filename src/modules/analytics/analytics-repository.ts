import { AnalyticsDatasource } from './analytics-datasource'

export class AnalyticsRepository {
  private readonly datasource: AnalyticsDatasource

  constructor(token: string) {
    this.datasource = new AnalyticsDatasource(token)
  }

  getSummary() {
    return this.datasource.getSummary()
  }
}
