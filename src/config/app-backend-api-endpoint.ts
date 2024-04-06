import queryString from 'query-string'
const AppBackEndApiEndpoint = {
  login: () => {
    return `${process.env.SERVER_API}/auth/login`
  },
  signUp: () => {
    return `${process.env.SERVER_API}/auth/join`
  },
  refresh: () => {
    return `${process.env.SERVER_API}/auth/refresh`
  },
  getMovie: () => {
    return `${process.env.SERVER_API}/movie`
  },
  getCommentList: (id: number) => {
    return queryString.stringifyUrl(
      {
        url: `${process.env.SERVER_API}/review`,
        query: {
          movieId: id,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    )
  },
  createNewComment: () => {
    return `${process.env.SERVER_API}/review`
  },
  deleteComment: (id: string) => {
    return `${process.env.SERVER_API}/review/${id}`
  },
}

export { AppBackEndApiEndpoint }
