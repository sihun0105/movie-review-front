export async function fetchWithTokenRefresh(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  const response = await fetch(url, options)

  if (response.status === 401) {
    const refreshResponse = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    })

    if (!refreshResponse.ok) {
      const errorData = await refreshResponse.json()

      if (errorData.error === 'Refresh token expired') {
        throw new Error('Refresh Token Expired')
      } else {
        throw new Error('Failed to refresh the token')
      }
    }

    return await fetch(url, options)
  }

  return response
}
