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
  return arg && arg.id && arg.provider && arg.nickname
}

export function assertUserEntity(arg: any): asserts arg is UserEntity {
  console.log(arg)
  if (!isUserEntity(arg)) {
    throw new Error('Invalid user')
  }
}
