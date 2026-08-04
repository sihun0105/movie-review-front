import { UserActivityDatasource } from './user-activity-datasource'
import { DeletableActivityItem, UserActivityType } from './user-activity-entity'

export class UserActivityRepository {
  private readonly datasource = new UserActivityDatasource()

  getSummary() {
    return this.datasource.getSummary()
  }

  getActivity(type: UserActivityType, page: number) {
    return this.datasource.getActivity(type, page)
  }

  deleteItem(item: DeletableActivityItem) {
    return this.datasource.deleteItem(item)
  }
}
