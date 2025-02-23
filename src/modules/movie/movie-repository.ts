import { MovieDatasource } from './movie-datasource'
import { Movie, assertMovie } from './movie-entity'

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
    } as Movie
    assertMovie(result)
    return result
  }
}
