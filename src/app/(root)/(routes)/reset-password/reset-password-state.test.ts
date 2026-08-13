import { describe, expect, it } from 'vitest'
import { isExpiredResetResponse } from './reset-password-state'

describe('isExpiredResetResponse', () => {
  it('recognizes an expired token response after form submission', () => {
    expect(
      isExpiredResetResponse({
        success: false,
        message: '유효하지 않거나 만료된 토큰입니다.',
      }),
    ).toBe(true)
  })

  it('keeps ordinary reset errors in the form', () => {
    expect(
      isExpiredResetResponse({ success: false, message: '오류가 발생했습니다.' }),
    ).toBe(false)
  })
})
