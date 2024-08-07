import queryString from 'query-string'

const AppClientApiEndpoint = {
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
          movieId
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
