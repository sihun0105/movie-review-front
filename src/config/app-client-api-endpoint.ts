import queryString from 'query-string'

const AppClientApiEndpoint = {
  updateProfile: () => {
    return `/api/profile`
  },
  createNewComment: (id: string) => {
    return `/api/comment/${id}`
  },
  deleteCommnet: (id: number) => {
    return `/api/comment/${id}`
  },
  reigster: () => {
    return `/api/register`
  },
  getComments: (movieId: number, page: number) => {
    return queryString.stringifyUrl(
      {
        url: `/api/comment/${movieId}`,
        query: {
          page,
          movieId,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    )
  },
  getChatHistory: (nowDate: string) => {
    return queryString.stringifyUrl(
      {
        url: `/api/chat/${nowDate}`,
        query: {
          nowDate,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    )
  },
  getMovieDetail: (movieCd: string) => {
    return queryString.stringifyUrl(
      {
        url: `/api/movie/${movieCd}`,
        query: {
          movieCd,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    )
  },
}

export { AppClientApiEndpoint }
