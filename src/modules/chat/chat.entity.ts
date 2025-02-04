export interface ChatEntity {
  id: number
  nickname: string
  createdAt: Date
  updatedAt: Date
  content: string
}

export function isChatEntity(arg: any): arg is ChatEntity {
  return arg && arg.id && arg.createdAt && arg.updatedAt && arg.content
}

export function assertChatEntity(arg: any): asserts arg is ChatEntity {
  if (!isChatEntity(arg)) {
    throw new Error('Invalid ChatEntity')
  }
}
