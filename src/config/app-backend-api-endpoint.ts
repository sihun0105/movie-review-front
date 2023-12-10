import queryString from 'query-string'
const AppBackEndApiEndpoint = {
  login: () => {
    return `${process.env.SERVER_API}/auth/login`
  },
  refresh: () => {
    return `${process.env.SERVER_API}/auth/refresh`
  },
  getMovie: () => {
    return `${process.env.SERVER_API}/`
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
}

export { AppBackEndApiEndpoint }
