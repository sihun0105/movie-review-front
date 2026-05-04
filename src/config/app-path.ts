const AppPath = {
  home: () => '/',
  login: () => '/login',
  register: () => '/register',
  forgotPassword: () => '/forgot-password',
  resetPassword: (token?: string) => token ? `/reset-password?token=${token}` : '/reset-password',
  match: () => '/match',
}

export { AppPath }
