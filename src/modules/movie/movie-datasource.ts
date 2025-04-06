import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import console from 'console'

export class MovieDatasource {
  private token?: string
  constructor(token?: string) {
    this.token = token
  }
  async getMovie() {
    const res = await fetch(AppBackEndApiEndpoint.getMovie(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.token}`,
      },
      cache: 'no-cache',
    })
    if (res.status !== 200) {
      throw new Error('Movie를 받아 올 수 없습니다.')
    }
    return res.json()
  }

  async getMovieDetail(movieCd: string) {
    const res = await fetch(AppBackEndApiEndpoint.getMovieDetail(movieCd), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.token}`,
      },
      cache: 'no-cache',
    })
    if (res.status !== 200) {
      throw new Error('Movie를 받아 올 수 없습니다.')
    }
    return res.json()
  }
  async updateScore(id: number, score: number) {
    const res = await fetch(AppBackEndApiEndpoint.updateScore(id), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        score,
      }),
      cache: 'no-cache',
    })
    if (!res.ok) {
      throw new Error('Movie를 받아 올 수 없습니다.')
    }
    return res.json()
  }

  async getScore(id: string) {
    const res = await fetch(AppBackEndApiEndpoint.getScore(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      cache: 'no-cache',
    })
    if (!res.ok) {
      throw new Error('Score를 받아 올 수 없습니다.')
    }
    return res.json()
  }
}
