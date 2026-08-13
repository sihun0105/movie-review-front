const baseUrl =
  process.env.SERVER_API ||
  process.env.NEXT_PUBLIC_SERVER_API ||
  'http://127.0.0.1:3030'

export const AuthBackEndEndpoint = {
  validateResetToken: () => `${baseUrl}/auth/validate-reset-token`,
}
