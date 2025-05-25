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
  oAuth: () => {
    return `${process.env.SERVER_API}/auth/oauth`
  },
  getCommentList: (id: number, page: number) => {
    return queryString.stringifyUrl(
      {
        url: `${process.env.SERVER_API}/reply`,
        query: {
          movieId: id,
          page: page,
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
  modifyComment: () => {
    return `${process.env.SERVER_API}/reply`
  },
  getChatHistory(nowDate: string) {
    return queryString.stringifyUrl(
      {
        url: `${process.env.CHAT_SERVER_API}/chat`,
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
    return `${process.env.SERVER_API}/movie/${movieCd}`
  },
  updateProfileNickname: () => {
    return `${process.env.SERVER_API}/user/nickname`
  },
  updateProfileImage: () => {
    return `${process.env.SERVER_API}/user/image`
  },
  updateScore: (id: number) => {
    return `${process.env.SERVER_API}/movie/score/${id}`
  },
  getScore: (id: string) => {
    return `${process.env.SERVER_API}/movie/score/${id}`
  },
  getAverageScore: (id: string) => {
    return `${process.env.SERVER_API}/movie/score/average/${id}`
  },
}

export { AppBackEndApiEndpoint }
