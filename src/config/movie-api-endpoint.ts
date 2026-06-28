import queryString from 'query-string'

const serverBase =
  process.env.SERVER_API ||
  process.env.NEXT_PUBLIC_SERVER_API ||
  'http://127.0.0.1:3030'

export const MovieBackEndApiEndpoint = {
  getMovie: () => `${serverBase}/movie`,
  getMovieDetail: (movieCd: string) => `${serverBase}/movie/${movieCd}`,
  getMoviesByDirector: (
    name: string,
    excludeMovieCd: number,
    limit: number,
  ) =>
    queryString.stringifyUrl(
      {
        url: `${serverBase}/movie/director`,
        query: { name, excludeMovieCd, limit },
      },
      { skipEmptyString: true, skipNull: true },
    ),
  updateScore: (id: number) => `${serverBase}/movie/score/${id}`,
  getScore: (id: string) => `${serverBase}/movie/score/${id}`,
  getAverageScore: (id: string) => `${serverBase}/movie/score/average/${id}`,
  getMovieTheaterList: () => `${serverBase}/movie/cgv/theaters`,
  getMovieTheaterDetail: (id: number) => `${serverBase}/movie-theater/${id}`,
  getMoviesByTheaterId: (theaterId: number) =>
    `${serverBase}/movie-theater/${theaterId}/movies`,
  getMovieDetailByTheater: (movieCd: string) =>
    `${serverBase}/movie-theater/movie/${movieCd}`,
}

export const MovieClientApiEndpoint = {
  getMovieDetail: (movieCd: string) =>
    queryString.stringifyUrl(
      {
        url: `/api/movie/${movieCd}`,
        query: { movieCd },
      },
      { skipEmptyString: true, skipNull: true },
    ),
  getMoviesByDirector: (
    name: string,
    excludeMovieCd: number,
    limit: number,
  ) =>
    queryString.stringifyUrl(
      {
        url: '/api/movie/director',
        query: { name, excludeMovieCd, limit },
      },
      { skipEmptyString: true, skipNull: true },
    ),
}
