import type { MatchPostFilter } from './hooks'

const MATCH_POST_FILTERS: MatchPostFilter[] = [
  'all',
  'available',
  'week',
  'mine',
]
const MAX_RESTORED_PAGE = 10

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
  params.delete('page')

  if (filter === 'all') params.delete('filter')
  else params.set('filter', filter)

  const query = params.toString()
  return query ? `/match?${query}` : '/match'
}

export function getMatchPage(value: string | null) {
  const page = Number(value)
  if (!Number.isInteger(page) || page < 1) return 1
  return Math.min(page, MAX_RESTORED_PAGE)
}

export function buildMatchPageHref(
  currentParams: URLSearchParams,
  page: number,
) {
  const params = new URLSearchParams(currentParams)
  if (page <= 1) params.delete('page')
  else params.set('page', String(Math.min(page, MAX_RESTORED_PAGE)))

  const query = params.toString()
  return query ? `/match?${query}` : '/match'
}
