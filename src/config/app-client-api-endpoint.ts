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
}

export { AppClientApiEndpoint }
