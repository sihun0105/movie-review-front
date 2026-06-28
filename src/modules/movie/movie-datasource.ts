import { MovieBackEndApiEndpoint } from '@/config/movie-api-endpoint'

export class MovieDatasource {
  private token?: string
  constructor(token?: string) {
    this.token = token
  }
  async getMovie() {
    const res = await fetch(MovieBackEndApiEndpoint.getMovie(), {
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
    const res = await fetch(MovieBackEndApiEndpoint.getMovieDetail(movieCd), {
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

  async getMoviesByDirector(
    name: string,
    excludeMovieCd: number,
    limit: number,
  ) {
    const res = await fetch(
      MovieBackEndApiEndpoint.getMoviesByDirector(name, excludeMovieCd, limit),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${this.token}`,
        },
        cache: 'no-cache',
      },
    )
    if (res.status !== 200) {
      throw new Error('감독 필모그래피를 받아 올 수 없습니다.')
    }
    return res.json()
  }
  async updateScore(id: number, score: number) {
    const res = await fetch(MovieBackEndApiEndpoint.updateScore(id), {
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
    const res = await fetch(MovieBackEndApiEndpoint.getScore(id), {
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
  async getAverageScore(id: string) {
    const res = await fetch(MovieBackEndApiEndpoint.getAverageScore(id), {
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

  async getMovieTheaterList() {
    const res = await fetch(MovieBackEndApiEndpoint.getMovieTheaterList(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      cache: 'no-cache',
    })
    if (!res.ok) {
      throw new Error('영화관 목록을 받아 올 수 없습니다.')
    }
    return res.json()
  }

  async getMovieTheaterDetail(id: number) {
    const res = await fetch(MovieBackEndApiEndpoint.getMovieTheaterDetail(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      cache: 'no-cache',
    })
    if (!res.ok) {
      throw new Error('영화관 상세 정보를 받아 올 수 없습니다.')
    }
    return res.json()
  }

  async getMoviesByTheaterId(theaterId: number) {
    const res = await fetch(
      MovieBackEndApiEndpoint.getMoviesByTheaterId(theaterId),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        cache: 'no-cache',
      },
    )
    if (!res.ok) {
      throw new Error('영화관에서 상영 중인 영화를 받아 올 수 없습니다.')
    }
    return res.json()
  }

  async getMovieDetailByTheater(movieCd: string) {
    const res = await fetch(
      MovieBackEndApiEndpoint.getMovieDetailByTheater(movieCd),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        cache: 'no-cache',
      },
    )
    if (!res.ok) {
      throw new Error(
        '영화관에서 상영 중인 영화 상세 정보를 받아 올 수 없습니다.',
      )
    }
    return res.json()
  }
}
