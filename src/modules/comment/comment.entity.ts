import { Reply } from '@/lib/type'

export function isComment(arg: any): arg is Reply {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.id === 'number' &&
    typeof arg.userno === 'number' &&
    typeof arg.nickname === 'string' &&
    typeof arg.content === 'string' &&
    arg.createdAt instanceof Date &&
    arg.updatedAt instanceof Date
  )
}

export function assertComment(arg: any): asserts arg is Reply {
  console.log('assertComment arg:', arg)
  if (!isComment(arg)) {
    throw new Error('Invalid Comment')
  }
}
