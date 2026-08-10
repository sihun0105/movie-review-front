import { describe, expect, it } from 'vitest'
import {
  buildMatchFilterHref,
  buildMatchPageHref,
  getMatchPage,
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

  it('restores a bounded page number and falls back to the first page', () => {
    expect(getMatchPage('3')).toBe(3)
    expect(getMatchPage('50')).toBe(10)
    expect(getMatchPage('invalid')).toBe(1)
    expect(getMatchPage('3abc')).toBe(1)
    expect(getMatchPage('2.5')).toBe(1)
  })

  it('records later pages while keeping the current filters', () => {
    expect(
      buildMatchPageHref(
        new URLSearchParams('movieTitle=%EA%B5%B0%EC%B2%B4&filter=week'),
        3,
      ),
    ).toBe('/match?movieTitle=%EA%B5%B0%EC%B2%B4&filter=week&page=3')
  })

  it('resets pagination when changing filters', () => {
    expect(
      buildMatchFilterHref(
        new URLSearchParams('filter=week&page=4'),
        'available',
      ),
    ).toBe('/match?filter=available')
  })
})
