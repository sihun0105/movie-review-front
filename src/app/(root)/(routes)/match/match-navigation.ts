export function buildNewMatchHref(movieTitle?: string) {
  return movieTitle
    ? `/match/new?movieTitle=${encodeURIComponent(movieTitle)}`
    : '/match/new'
}
