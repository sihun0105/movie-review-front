import { UserActivityDatasource } from './user-activity-datasource'

export class UserActivityRepository {
  private readonly datasource = new UserActivityDatasource()

  getSummary() {
    return this.datasource.getSummary()
  }
}
