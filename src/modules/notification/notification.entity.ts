export interface NotificationItem {
  id: string
  userId: number
  type: 'match_apply' | 'chat_message' | string
  title: string
  body: string
  isRead: boolean
  targetId: string | null
  createdAt: string
}

export interface NotificationListResponse {
  items: NotificationItem[]
  total: number
  hasNext: boolean
}

export interface UnreadCountResponse {
  count: number
}
