export interface UserEntity {
  accessToken: string
  refreshToken: string
  expireTime: number
}

export function isUserEntity(arg: any): arg is UserEntity {
  return arg && arg.accessToken && arg.refreshToken
}

export function assertUserEntity(arg: any): asserts arg is UserEntity {
  if (!isUserEntity(arg)) {
    throw new Error('Invalid user')
  }
}
