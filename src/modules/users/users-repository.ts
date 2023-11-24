import { UsersDatasource } from './users-datasource'
import { UserEntity } from './users.entity'

export class UsersRepository {
  private datasource: UsersDatasource
  constructor(
    private token?: string,
    datasource?: UsersDatasource,
  ) {
    this.datasource = datasource ?? new UsersDatasource(token)
  }
  async login({ userId, password }: { userId: string; password: string }) {
    try {
      const result = await this.datasource.login({
        userId: userId,
        password: password,
      })
      return this.signInDataConverter(result)
    } catch (err) {
      throw new Error('UsersRepository-signIn 에러')
    }
  }

  signInDataConverter = (data: any): UserEntity => {
    let expireTimeInSeconds: number
    if (typeof data.expireTime === 'string' && data.expireTime.endsWith('d')) {
      const days = Number(data.expireTime.slice(0, -1))
      expireTimeInSeconds = days * 24 * 60 * 60
    } else {
      expireTimeInSeconds = Number(data.expireTime)
    }

    const expireTimeInUnixTimestamp =
      Math.floor(Date.now() / 1000) + expireTimeInSeconds

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expireTime: expireTimeInUnixTimestamp,
    }
  }
}
