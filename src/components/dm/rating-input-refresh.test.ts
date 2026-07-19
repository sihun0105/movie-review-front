import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'
import { refreshScoreViews } from './rating-input-refresh'

const ratingInputPath = fileURLToPath(
  new URL('./rating-input.tsx', import.meta.url),
)
const movieDetailPath = fileURLToPath(
  new URL('./dm-movie-detail.tsx', import.meta.url),
)
const descriptionPath = fileURLToPath(
  new URL(
    '../../app/(root)/(routes)/movie/[id]/sections/description-section.tsx',
    import.meta.url,
  ),
)

describe('rating refresh', () => {
  it('refreshes both the personal score and movie aggregate', async () => {
    const refreshMyScore = vi.fn().mockResolvedValue(undefined)
    const refreshMovie = vi.fn().mockResolvedValue(undefined)

    await refreshScoreViews(refreshMyScore, refreshMovie)

    expect(refreshMyScore).toHaveBeenCalledOnce()
    expect(refreshMovie).toHaveBeenCalledOnce()
  })

  it('wires the movie detail refresh callback to the rating input', () => {
    const ratingInput = readFileSync(ratingInputPath, 'utf8')
    const movieDetail = readFileSync(movieDetailPath, 'utf8')
    const description = readFileSync(descriptionPath, 'utf8')

    expect(ratingInput).toContain('refreshScoreViews(mutate, onScoreSaved)')
    expect(movieDetail).toContain('onScoreSaved={onScoreSaved}')
    expect(description).toContain('onScoreSaved={refreshMovie}')
  })
})
