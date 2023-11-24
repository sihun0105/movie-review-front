const AppBackEndApiEndpoint = {
  login: () => {
    return `${process.env.SERVER_API}/auth/login`
  },
  refresh: () => {
    return `${process.env.SERVER_API}/auth/refresh`
  },
}

export { AppBackEndApiEndpoint }
