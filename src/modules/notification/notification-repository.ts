import { NotificationDataSource } from './notification-datasource'
import type { NotificationListResponse, UnreadCountResponse } from './notification.entity'

export class NotificationRepository {
  private ds: NotificationDataSource

  constructor(token?: string) {
    this.ds = new NotificationDataSource(token)
  }

  getNotifications(page = 1, pageSize = 20): Promise<NotificationListResponse> {
    return this.ds.getNotifications(page, pageSize)
  }

  getUnreadCount(): Promise<UnreadCountResponse> {
    return this.ds.getUnreadCount()
  }

  markAsRead(id: string): Promise<void> {
    return this.ds.markAsRead(id)
  }

  markAllAsRead(): Promise<void> {
    return this.ds.markAllAsRead()
  }
}
