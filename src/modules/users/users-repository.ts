import { UsersDatasource } from './users-datasource'
import { assertUserEntity } from './users.entity'

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
      return this.convertToUserEntity(result)
    } catch (err) {
      throw new Error('UsersRepository-signIn 에러')
    }
  }
  async signUp({
    userId,
    password,
    nickname,
  }: {
    userId: string
    password: string
    nickname: string
  }) {
    try {
      const result = await this.datasource.signUp({
        userId: userId,
        password: password,
        nickname: nickname,
      })
      return result
    } catch (err) {
      throw new Error('UsersRepository-signUp 에러')
    }
  }

  async signInWithProvider(params: { id: string }) {
    try {
      const result = await this.datasource.signInWithProvider({
        id: params.id,
      })
      return this.convertToUserEntity(result)
    } catch (error) {
      console.log(error)
      throw new Error('UsersRepository-signInWithProvider 에러')
    }
  }
  async signUpWithProvider(params: {
    email: string
    platform: string
    nickname: string
  }) {
    try {
      const result = await this.datasource.signUpWithProvider(params)
      return result
    } catch (error) {
      throw new Error('UsersRepository-signUpWithProvider 에러')
    }
  }

  convertToUserEntity(arg: any) {
    const result = {
      id: arg.id,
      provider: arg.provider ?? 'credentials',
      phone: arg.phone ?? '',
      nickname: arg.nickname ?? '',
      name: arg.name ?? '',
      email: arg.email ?? '',
      profile: arg.profile ?? '',
    }
    assertUserEntity(result)
    return result
  }
}
