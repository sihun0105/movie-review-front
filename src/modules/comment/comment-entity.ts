import { Reply } from '@/lib/type'

export function isComment(arg: any): arg is Reply {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.replyId === 'number' &&
    typeof arg.userId === 'number' &&
    typeof arg.email === 'string' &&
    typeof arg.nickname === 'string' &&
    typeof arg.comment === 'string' &&
    arg.createdAt instanceof Date &&
    arg.updatedAt instanceof Date
  )
}

export function assertComment(arg: any): asserts arg is Reply {
  if (!isComment(arg)) {
    throw new Error('Invalid Comment')
  }
}
