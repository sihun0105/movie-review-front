import { MovieDatasource } from './movie-datasource'
import {
  AverageMovieScore,
  CGVTheaterDetail,
  CGVTheaterList,
  Movie,
  MovieCatalogPage,
  Score,
  assertAverageMovieScore,
  assertMovie,
  assertScore,
} from './movie.entity'

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
  async getTopRatedMovies(limit = 12): Promise<Movie[]> {
    const data = await this.datasource.getTopRatedMovies(limit)
    const movies = Array.isArray(data.MovieData) ? data.MovieData : []
    return movies.map((item: any) => this.convertUnkownToMovie(item))
  }
  async getMovieCatalog(
    query: string,
    genre: string,
    page: number,
    pageSize = 24,
  ): Promise<MovieCatalogPage> {
    const data = await this.datasource.getMovieCatalog(
      query,
      genre,
      page,
      pageSize,
    )
    return {
      ...data,
      movies: (data.movies ?? []).map((item: any) =>
        this.convertUnkownToMovie(item),
      ),
    }
  }
  async getMovieDetail(movieCd: string): Promise<Movie> {
    const data = await this.datasource.getMovieDetail(movieCd)
    return this.convertUnkownToMovie(data)
  }

  async getMoviesByDirector(
    name: string,
    excludeMovieCd: number,
    limit = 12,
  ): Promise<Movie[]> {
    const data = await this.datasource.getMoviesByDirector(
      name,
      excludeMovieCd,
      limit,
    )
    const movies = Array.isArray(data.MovieData) ? data.MovieData : []
    return movies.map((item: any) => {
      return this.convertUnkownToMovie(item)
    })
  }

  private convertUnkownToMovie(unknown: any): Movie {
    const rank = Number(unknown.rank) || 0
    const result = {
      id: unknown.movieCd,
      audience: unknown.audience,
      title: unknown.title,
      createdAt: new Date(unknown.createdAt),
      updatedAt: new Date(unknown.updatedAt),
      poster: unknown.poster,
      rank,
      isRanked:
        typeof unknown.isRanked === 'boolean' ? unknown.isRanked : rank > 0,
      rankInten: unknown.rankInten,
      plot: unknown.plot,
      rankOldAndNew: unknown.rankOldAndNew,
      openedAt: new Date(unknown.openDt),
      genre: unknown.genre,
      director: unknown.director,
      ratting: unknown.ratting,
      vods: unknown.vods,
      commentCount: unknown.commentCount,
      scoreCount: unknown.scoreCount,
      averageScore: unknown.averageScore,
      actors: Array.isArray(unknown.actors)
        ? unknown.actors.map((actor: any) => ({
            id: Number(actor.id),
            name: String(actor.name ?? ''),
            character: String(actor.character ?? ''),
            profileUrl: String(actor.profileUrl ?? ''),
            sortOrder: Number(actor.sortOrder) || 0,
          }))
        : [],
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

  async getMovieTheaterDetail(id: number): Promise<CGVTheaterDetail> {
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

  async getMoviesByTheaterId(theaterId: number): Promise<Movie[]> {
    const data = await this.datasource.getMoviesByTheaterId(theaterId)
    return (
      data.MovieData?.map((item: any) => {
        return this.convertUnkownToMovie(item)
      }) ?? []
    )
  }

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
