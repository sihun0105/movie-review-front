import type { MatchPostFilter } from './hooks'

const MATCH_POST_FILTERS: MatchPostFilter[] = [
  'all',
  'available',
  'week',
  'mine',
]

export function getMatchPostFilter(value: string | null): MatchPostFilter {
  return MATCH_POST_FILTERS.includes(value as MatchPostFilter)
    ? (value as MatchPostFilter)
    : 'all'
}

export function buildMatchFilterHref(
  currentParams: URLSearchParams,
  filter: MatchPostFilter,
) {
  const params = new URLSearchParams(currentParams)

  if (filter === 'all') params.delete('filter')
  else params.set('filter', filter)

  const query = params.toString()
  return query ? `/match?${query}` : '/match'
}
