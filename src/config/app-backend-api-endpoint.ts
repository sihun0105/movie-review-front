import queryString from 'query-string'
const AppBackEndApiEndpoint = {
  login: () => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/auth/login`
  },
  signUp: () => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/user`
  },
  refresh: () => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/auth/refresh`
  },
  getMovie: () => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/movie`
  },
  oAuth: () => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/auth/oauth`
  },
  validateEmail: () => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/auth/validate/email`
  },
  validateNickname: () => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/auth/validate/nickname`
  },
  getCommentList: (id: number, page: number) => {
    return queryString.stringifyUrl(
      {
        url: `${process.env.NEXT_PUBLIC_SERVER_API}/reply`,
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
    return `${process.env.NEXT_PUBLIC_SERVER_API}/reply`
  },
  deleteComment: (id: string) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/reply/${id}`
  },
  modifyComment: () => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/reply`
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
    return `${process.env.NEXT_PUBLIC_SERVER_API}/movie/${movieCd}`
  },
  updateProfileNickname: () => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/user/nickname`
  },
  updateProfileImage: () => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/user/image`
  },
  updateScore: (id: number) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/movie/score/${id}`
  },
  getScore: (id: string) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/movie/score/${id}`
  },
  getAverageScore: (id: string) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/movie/score/average/${id}`
  },
  // ✅ Article 관련
  createArticle: () => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/article`
  },
  getArticle: (id: number) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/article/${id}`
  },
  listArticles: (page: number, pageSize: number = 10) => {
    return queryString.stringifyUrl(
      {
        url: `${process.env.NEXT_PUBLIC_SERVER_API}/article`,
        query: { page, pageSize },
      },
      { skipEmptyString: true, skipNull: true },
    )
  },
  updateArticle: (id: number) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/article/${id}`
  },
  deleteArticle: (id: number) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/article/${id}`
  },

  // ✅ 댓글 관련
  createArticleComment: (articleId: number) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/article/${articleId}/comments`
  },
  updateArticleComment: (commentId: number) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/article/comments/${commentId}`
  },
  deleteArticleComment: (commentId: number) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/article/comments/${commentId}`
  },
  listArticleComments: (
    articleId: number,
    page: number,
    pageSize: number = 10,
  ) => {
    return queryString.stringifyUrl(
      {
        url: `${process.env.NEXT_PUBLIC_SERVER_API}/article/${articleId}/comments`,
        query: { page, pageSize },
      },
      { skipEmptyString: true, skipNull: true },
    )
  },

  // ✅ 좋아요 관련
  getLikeArticle: (articleId: number) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/article/${articleId}/likes`
  },
  updateLikeArticle: (articleId: number) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/article/${articleId}/like`
  },

  // 영화관 관련
  getMovieTheaterList: () => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/movie/cgv/theaters`
  },
  getMovieTheaterDetail: (id: number) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/movie-theater/${id}`
  },
  getMoviesByTheaterId: (theaterId: number) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/movie-theater/${theaterId}/movies`
  },
  getMovieDetailByTheater: (movieCd: string) => {
    return `${process.env.NEXT_PUBLIC_SERVER_API}/movie-theater/movie/${movieCd}`
  },
}

export { AppBackEndApiEndpoint }
