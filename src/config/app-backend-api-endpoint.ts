import queryString from 'query-string'

// SERVER_API (non-public) 를 우선 사용 → Docker 내부 hostname 설정 가능
// 미설정 시 NEXT_PUBLIC_SERVER_API 폴백, 그것도 없으면 localhost
const _base =
  process.env.SERVER_API ||
  process.env.NEXT_PUBLIC_SERVER_API ||
  'http://127.0.0.1:3030'

const AppBackEndApiEndpoint = {
  login: () => {
    return `${_base}/auth/login`
  },
  signUp: () => {
    return `${_base}/user`
  },
  refresh: () => {
    return `${_base}/auth/refresh`
  },
  getMovie: () => {
    return `${_base}/movie`
  },
  oAuth: () => {
    return `${_base}/auth/oauth`
  },
  validateEmail: () => {
    return `${_base}/auth/validate/email`
  },
  validateNickname: () => {
    return `${_base}/auth/validate/nickname`
  },
  sendVerification: () => {
    return `${_base}/auth/send-verification`
  },
  verifyCode: () => {
    return `${_base}/auth/verify-code`
  },
  forgotPassword: () => {
    return `${_base}/auth/forgot-password`
  },
  resetPassword: () => {
    return `${_base}/auth/reset-password`
  },
  getCommentList: (id: number, page: number) => {
    return queryString.stringifyUrl(
      {
        url: `${_base}/reply`,
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
    return `${_base}/reply`
  },
  deleteComment: (id: string) => {
    return `${_base}/reply/${id}`
  },
  modifyComment: () => {
    return `${_base}/reply`
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
    return `${_base}/movie/${movieCd}`
  },
  updateProfileNickname: () => {
    return `${_base}/user/nickname`
  },
  updateProfileImage: () => {
    return `${_base}/user/image`
  },
  updateScore: (id: number) => {
    return `${_base}/movie/score/${id}`
  },
  getScore: (id: string) => {
    return `${_base}/movie/score/${id}`
  },
  getAverageScore: (id: string) => {
    return `${_base}/movie/score/average/${id}`
  },
  // ✅ Article 관련
  createArticle: () => {
    return `${_base}/article`
  },
  getArticle: (id: number) => {
    return `${_base}/article/${id}`
  },
  listArticles: (page: number, pageSize: number = 10) => {
    return queryString.stringifyUrl(
      {
        url: `${_base}/article`,
        query: { page, pageSize },
      },
      { skipEmptyString: true, skipNull: true },
    )
  },
  updateArticle: (id: number) => {
    return `${_base}/article/${id}`
  },
  deleteArticle: (id: number) => {
    return `${_base}/article/${id}`
  },

  // ✅ 댓글 관련
  createArticleComment: (articleId: number) => {
    return `${_base}/article/${articleId}/comments`
  },
  updateArticleComment: (commentId: number) => {
    return `${_base}/article/comments/${commentId}`
  },
  deleteArticleComment: (commentId: number) => {
    return `${_base}/article/comments/${commentId}`
  },
  listArticleComments: (
    articleId: number,
    page: number,
    pageSize: number = 10,
  ) => {
    return queryString.stringifyUrl(
      {
        url: `${_base}/article/${articleId}/comments`,
        query: { page, pageSize },
      },
      { skipEmptyString: true, skipNull: true },
    )
  },

  // ✅ 좋아요 관련
  getLikeArticle: (articleId: number) => {
    return `${_base}/article/${articleId}/likes`
  },
  updateLikeArticle: (articleId: number) => {
    return `${_base}/article/${articleId}/like`
  },

  // 영화관 관련
  getMovieTheaterList: () => {
    return `${_base}/movie/cgv/theaters`
  },
  getMovieTheaterDetail: (id: number) => {
    return `${_base}/movie-theater/${id}`
  },
  getMoviesByTheaterId: (theaterId: number) => {
    return `${_base}/movie-theater/${theaterId}/movies`
  },
  getMovieDetailByTheater: (movieCd: string) => {
    return `${_base}/movie-theater/movie/${movieCd}`
  },

  // Match 관련
  getMatchPosts: (page: number = 1, pageSize: number = 10) => {
    return queryString.stringifyUrl(
      {
        url: `${_base}/match`,
        query: { page, pageSize },
      },
      { skipEmptyString: true, skipNull: true },
    )
  },
  createMatchPost: () => {
    return `${_base}/match`
  },
  getMatchPost: (matchId: string) => {
    return `${_base}/match/${matchId}`
  },
  updateMatchPost: (matchId: string) => {
    return `${_base}/match/${matchId}`
  },
  deleteMatchPost: (matchId: string) => {
    return `${_base}/match/${matchId}`
  },
  applyToMatch: (matchId: string) => {
    return `${_base}/match/${matchId}/apply`
  },
  getMatchApplications: (matchId: string) => {
    return `${_base}/match/${matchId}/applications`
  },
  updateApplicationStatus: (matchId: string, applicationId: string) => {
    return `${_base}/match/${matchId}/applications/${applicationId}`
  },
  getMyApplications: () => {
    return `${_base}/match/my-applications`
  },
  getMyPosts: () => {
    return `${_base}/match/my-posts`
  },
  cancelApplication: (applicationId: string) => {
    return `${_base}/match/applications/${applicationId}`
  },
  getMyApplication: (matchId: string) => {
    return `${_base}/match/${matchId}/my-application`
  },

  // ✅ Chat 관련
  createChatRoom: () => {
    return `${_base}/chat/rooms`
  },
  getChatRoom: (chatRoomId: string) => {
    return `${_base}/chat/rooms/${chatRoomId}`
  },
  getChatRooms: () => {
    return `${_base}/chat/rooms`
  },
  getChatMessages: (chatRoomId: string) => {
    return `${_base}/chat/rooms/${chatRoomId}/messages`
  },
}

export { AppBackEndApiEndpoint }
