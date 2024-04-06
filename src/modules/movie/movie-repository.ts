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
    return data.MovieData.map((item: any) => {
      return this.convertUnkownToMovie(item)
    })
  }

  private convertUnkownToMovie(unknown: any): Movie {
    const result = {
      id: unknown.movieCd,
      audience: unknown.audience,
      title: unknown.title,
      createdAt: new Date(unknown.createdAt),
      updatedAt: new Date(unknown.updatedAt),
    } as Movie
    assertMovie(result)
    return result
  }
}
