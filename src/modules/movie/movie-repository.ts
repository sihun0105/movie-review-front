import { MovieDatasource } from './movie-datasource'
import {
  AverageMovieScore,
  Movie,
  Score,
  assertAverageMovieScore,
  assertMovie,
  assertScore,
} from './movie-entity'

export interface CGVTheaterList {
  theaters: CGVTheater[]
}
export interface CGVTheater {
  id: number
  name: string
  region: string
  address: string
  phone: string
  website: string
  latitude: number
  longitude: number
  createdAt: string
  updatedAt: string
}
export class MovieRepository {
  private datasource: MovieDatasource
  constructor(
    private token?: string,
    datasource?: MovieDatasource,
  ) {
    this.datasource = datasource ?? new MovieDatasource(token)
  }

  async getMovie(): Promise<Movie[]> {
    const data = await this.datasource.getMovie()
    return data.MovieData?.map((item: any) => {
      return this.convertUnkownToMovie(item)
    })
  }
  async getMovieDetail(movieCd: string): Promise<Movie> {
    const data = await this.datasource.getMovieDetail(movieCd)
    return this.convertUnkownToMovie(data)
  }

  private convertUnkownToMovie(unknown: any): Movie {
    const result = {
      id: unknown.movieCd,
      audience: unknown.audience,
      title: unknown.title,
      createdAt: new Date(unknown.createdAt),
      updatedAt: new Date(unknown.updatedAt),
      poster: unknown.poster,
      rankInten: unknown.rankInten,
      plot: unknown.plot,
      rankOldAndNew: unknown.rankOldAndNew,
      openedAt: new Date(unknown.openDt),
      genre: unknown.genre,
      director: unknown.director,
      ratting: unknown.ratting,
      vods: unknown.vods,
    } as Movie
    assertMovie(result)
    return result
  }
  private convertToScoreEntity(unknown: any): Score {
    const result = {
      id: unknown.id ?? 0,
      score: unknown.score,
      userId: unknown.userId,
      movieCd: unknown.movieCd,
    } as Score
    assertScore(result)
    return result
  }
  async updateScore(id: number, score: number): Promise<Score> {
    const data = await this.datasource.updateScore(id, score)
    return this.convertToScoreEntity(data)
  }

  async getScore(id: string): Promise<Score> {
    const data = await this.datasource.getScore(id)
    return this.convertToScoreEntity(data)
  }
  async getAverageScore(id: string): Promise<AverageMovieScore> {
    const data = await this.datasource.getAverageScore(id)
    return this.convertToAverageMovieScoreEntity(data)
  }
  // 영화관 목록 호출
  async getMovieTheaterList(): Promise<CGVTheaterList> {
    const data = await this.datasource.getMovieTheaterList()
    return {
      theaters:
        data.theaters?.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            region: item.region,
            address: item.address,
            phone: item.phone,
            website: item.website,
            latitude: item.latitude,
            longitude: item.longitude,
            createdAt: item.createdAt, // 이미 string이면 그대로 반환
            updatedAt: item.updatedAt,
          }
        }) ?? [],
    }
  }

  // 영화관 상세 정보 호출
  async getMovieTheaterDetail(id: number): Promise<any> {
    const data = await this.datasource.getMovieTheaterDetail(id)
    return {
      id: data.id,
      name: data.name,
      address: data.address,
      phone: data.phone,
      movies:
        data.movies?.map((movie: any) => ({
          movieCd: movie.movieCd,
          title: movie.title,
          poster: movie.poster,
          openedAt: new Date(movie.openedAt),
        })) ?? [],
    }
  }

  // 영화관에서 상영 중인 영화 목록 호출
  async getMoviesByTheaterId(theaterId: number): Promise<Movie[]> {
    const data = await this.datasource.getMoviesByTheaterId(theaterId)
    return (
      data.MovieData?.map((item: any) => {
        return this.convertUnkownToMovie(item)
      }) ?? []
    )
  }

  // 영화관에서 상영 중인 영화 상세 정보 호출
  async getMovieDetailByTheater(movieCd: string): Promise<Movie> {
    const data = await this.datasource.getMovieDetailByTheater(movieCd)
    return this.convertUnkownToMovie(data)
  }

  private convertToAverageMovieScoreEntity(unknown: any): AverageMovieScore {
    const result = {
      averageScore: unknown.averageScore,
      movieCd: unknown.movieCd,
      scoreCount: unknown.scoreCount,
    } as AverageMovieScore
    assertAverageMovieScore(result)
    return result
  }
}
