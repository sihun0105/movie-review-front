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
    const result = await this.datasource.login({ userId, password })
    return this.convertToUserEntity(result)
  }

  async signUp({
    userId,
    password,
    nickname,
    gender,
  }: {
    userId: string
    password: string
    nickname: string
    gender: string
  }) {
    return await this.datasource.signUp({ userId, password, nickname, gender })
  }

  async signInWithProvider(params: { id: string }) {
    const result = await this.datasource.signInWithProvider({ id: params.id })
    return this.convertToUserEntity(result)
  }

  async signUpWithProvider(params: {
    email: string
    platform: string
    nickname: string
  }) {
    return await this.datasource.signUpWithProvider(params)
  }

  convertToUserEntity(arg: any) {
    const result = {
      id: arg.id,
      provider: arg.provider ?? 'credentials',
      phone: arg.phone ?? '',
      nickname: arg.nickname ?? '',
      name: arg.name ?? '',
      email: arg.email ?? '',
      image: arg.image ?? '',
    }
    assertUserEntity(result)
    return result
  }

  async updateProfile({ nickname }: { nickname: string }) {
    return await this.datasource.updateProfile({ nickname })
  }

  async updateImage({ file }: { file: File }) {
    return await this.datasource.updateImage({ file })
  }
}
