const AppClientApiEndpoint = {
  createNewComment: (id: string) => {
    return `/api/comment/${id}`
  },
}

export { AppClientApiEndpoint }
