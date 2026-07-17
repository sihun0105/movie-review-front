import { describe, expect, it } from 'vitest'
import {
  DEFAULT_PROFILE_IMAGE_URL,
  resolveUserAvatarImage,
} from '../../lib/utils/user-avatar'

describe('resolveUserAvatarImage', () => {
  it('uses the default image when a legacy user has no profile image', () => {
    expect(resolveUserAvatarImage(undefined)).toBe(DEFAULT_PROFILE_IMAGE_URL)
    expect(resolveUserAvatarImage('')).toBe(DEFAULT_PROFILE_IMAGE_URL)
    expect(resolveUserAvatarImage('   ')).toBe(DEFAULT_PROFILE_IMAGE_URL)
  })

  it('keeps an existing profile image', () => {
    expect(resolveUserAvatarImage('https://example.com/profile.png')).toBe(
      'https://example.com/profile.png',
    )
  })
})
