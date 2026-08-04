export const UserActivityClientApiEndpoint = {
  getSummary: () => '/api/user/activity-summary',
  getActivity: (type: string, page: number, pageSize = 10) =>
    `/api/user/activity/${type}?page=${page}&pageSize=${pageSize}`,
  deleteRating: (movieCd: number) => `/api/user/activity/ratings/${movieCd}`,
  deleteComment: (commentId: number) => `/api/article/comment/${commentId}`,
  deleteArticle: (articleId: number) => `/api/article/${articleId}`,
}
