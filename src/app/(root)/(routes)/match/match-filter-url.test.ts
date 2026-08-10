import { describe, expect, it } from 'vitest'
import {
  buildMatchFilterHref,
  getMatchPostFilter,
} from './match-filter-url'

describe('match filter URL', () => {
  it('restores a supported filter and falls back to all', () => {
    expect(getMatchPostFilter('week')).toBe('week')
    expect(getMatchPostFilter('unknown')).toBe('all')
    expect(getMatchPostFilter(null)).toBe('all')
  })

  it('keeps the movie title while adding a filter', () => {
    expect(
      buildMatchFilterHref(
        new URLSearchParams('movieTitle=%EA%B5%B0%EC%B2%B4'),
        'available',
      ),
    ).toBe('/match?movieTitle=%EA%B5%B0%EC%B2%B4&filter=available')
  })

  it('removes the filter query for the default all tab', () => {
    expect(
      buildMatchFilterHref(
        new URLSearchParams('movieTitle=%EA%B5%B0%EC%B2%B4&filter=mine'),
        'all',
      ),
    ).toBe('/match?movieTitle=%EA%B5%B0%EC%B2%B4')
  })
})
