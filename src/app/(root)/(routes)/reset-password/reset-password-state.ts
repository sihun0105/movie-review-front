interface ResetResponse {
  success?: boolean
  message?: string
}

export function isExpiredResetResponse(response: ResetResponse): boolean {
  return response.success === false && Boolean(response.message?.includes('만료'))
}
