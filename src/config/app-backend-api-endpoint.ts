import queryString from 'query-string'
const AppBackEndApiEndpoint = {
  login: () => {
    return `${process.env.SERVER_API}/auth/login`
  },
  signUp: () => {
    return `${process.env.SERVER_API}/user`
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
        url: `${process.env.SERVER_API}/reply`,
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
    return `${process.env.SERVER_API}/reply`
  },
  deleteComment: (id: string) => {
    return `${process.env.SERVER_API}/reply/${id}`
  },
}

export { AppBackEndApiEndpoint }
