import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import type {
  NotificationListResponse,
  UnreadCountResponse,
} from './notification.entity'

export class NotificationDataSource {
  constructor(private token?: string) {}

  private headers(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
  }

  async getNotifications(page = 1, pageSize = 20): Promise<NotificationListResponse> {
    const res = await fetch(AppBackEndApiEndpoint.getNotifications(page, pageSize), {
      headers: this.headers(),
      cache: 'no-cache',
    })
    if (!res.ok) throw new Error(`[${res.status}] ${res.statusText}`)
    return res.json()
  }

  async getUnreadCount(): Promise<UnreadCountResponse> {
    const res = await fetch(AppBackEndApiEndpoint.getUnreadNotificationCount(), {
      headers: this.headers(),
      cache: 'no-cache',
    })
    if (!res.ok) throw new Error(`[${res.status}] ${res.statusText}`)
    return res.json()
  }

  async markAsRead(id: string): Promise<void> {
    const res = await fetch(AppBackEndApiEndpoint.markNotificationRead(id), {
      method: 'PATCH',
      headers: this.headers(),
    })
    if (!res.ok) throw new Error(`[${res.status}] ${res.statusText}`)
  }

  async markAllAsRead(): Promise<void> {
    const res = await fetch(AppBackEndApiEndpoint.markAllNotificationsRead(), {
      method: 'PATCH',
      headers: this.headers(),
    })
    if (!res.ok) throw new Error(`[${res.status}] ${res.statusText}`)
  }
}
