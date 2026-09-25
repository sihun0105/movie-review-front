import { describe, expect, it } from 'vitest'
import { SwipeClickGuard } from './swipe-click-guard'

describe('SwipeClickGuard', () => {
  it('allows a stationary tap', () => {
    const guard = new SwipeClickGuard()
    guard.start(10, 10)

    expect(guard.shouldCancelClick()).toBe(false)
  })

  it('cancels a click after the pointer moves beyond the threshold', () => {
    const guard = new SwipeClickGuard()
    guard.start(10, 10)
    guard.move(19, 10)

    expect(guard.shouldCancelClick()).toBe(true)
    expect(guard.shouldCancelClick()).toBe(false)
  })

  it('cancels a click when scrolling cancels the pointer', () => {
    const guard = new SwipeClickGuard()
    guard.start(10, 10)
    guard.cancel()

    expect(guard.shouldCancelClick()).toBe(true)
  })
})
