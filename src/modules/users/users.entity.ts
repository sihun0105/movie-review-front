export interface UserEntity {
  id: number
  provider: string
  phone?: string
  name: string
  email?: string
  image: string
  nickname: string
}

export function isUserEntity(arg: any): arg is UserEntity {
  return (
    arg &&
    Number.isInteger(Number(arg.id)) &&
    typeof arg.provider === 'string' &&
    typeof arg.nickname === 'string'
  )
}

export function assertUserEntity(arg: any): asserts arg is UserEntity {
  if (!isUserEntity(arg)) {
    throw new Error('Invalid user')
  }
}
