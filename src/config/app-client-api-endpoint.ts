import queryString from 'query-string'

const AppClientApiEndpoint = {
  getScore: (id: number) => {
    return `/api/score/${id}`
  },
  updateScore: (id: number) => {
    return `/api/score/${id}`
  },
  updateProfile: () => {
    return `/api/profile`
  },
  updateImage: () => {
    return `/api/profile/image`
  },
  createNewComment: (id: string) => {
    return `/api/comment/${id}`
  },
  deleteCommnet: (id: number) => {
    return `/api/comment/${id}`
  },
  modifyComment: (id: number) => {
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

  // ✅ 게시글 관련 API
  listArticles: (page: number) => {
    return queryString.stringifyUrl(
      {
        url: `/api/article`,
        query: { page },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    )
  },
  createArticle: () => {
    return `/api/article`
  },
  updateArticle: (id: number) => {
    return `/api/article/${id}`
  },
  deleteArticle: (id: number) => {
    return `/api/article/${id}`
  },
  getArticle: (id: number) => {
    return `/api/article/${id}`
  },
  getArticleLikes: (id: number) => {
    return queryString.stringifyUrl(
      {
        url: `/api/article/${id}/likes`,
        query: { id },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    )
  },
  updateArticleLike: (id: number, state: 'like' | 'dislike') => {
    return queryString.stringifyUrl(
      {
        url: `/api/article/${id}/like`,
        query: { id, state },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    )
  },
  // 게시글 댓글 관련 API
  getArticleComments: (articleId: number, page: number) => {
    return queryString.stringifyUrl(
      {
        url: `/api/article/comment/${articleId}`,
        query: { articleId, page },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    )
  },
  createArticleComment: (articleId: number) => {
    return `/api/article/comment/${articleId}`
  },
  deleteArticleComment: (commentId: number) => {
    return queryString.stringifyUrl(
      {
        url: `/api/article/comment/${commentId}`,
        query: { commentId },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    )
  },
  modifyArticleComment: (commentId: number) => {
    return queryString.stringifyUrl(
      {
        url: `/api/article/comment/${commentId}`,
        query: { commentId },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    )
  },
}

export { AppClientApiEndpoint }
