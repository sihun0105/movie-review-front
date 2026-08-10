import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  DEFAULT_PROFILE_IMAGE_URL,
  resolveUserAvatarImage,
} from '../../lib/utils/user-avatar'
import {
  isAvatarDataPending,
  isAvatarImagePending,
} from './dm-user-avatar-state'

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

describe('DmUserAvatar loading UI', () => {
  const source = readFileSync(
    fileURLToPath(new URL('./dm-user-avatar.tsx', import.meta.url)),
    'utf8',
  )

  it('shows a skeleton while user data is pending', () => {
    expect(source).toContain('isLoading')
    expect(source).toContain('isAvatarDataPending(isLoading, name, image)')
    expect(source).toContain('<Skeleton')
  })

  it('distinguishes pending data from a loaded user without an image', () => {
    expect(isAvatarDataPending(undefined, undefined, undefined)).toBe(true)
    expect(isAvatarDataPending(undefined, '볼래', null)).toBe(false)
    expect(isAvatarDataPending(false, undefined, undefined)).toBe(false)
    expect(isAvatarDataPending(true, '볼래', 'profile.png')).toBe(true)
  })

  it('keeps the skeleton until the profile image finishes loading', () => {
    expect(source).toContain('onLoadingStatusChange')
    expect(source).toContain('isAvatarImagePending(imageSrc, imageState)')
  })

  it('handles image loading, failure, and source changes', () => {
    expect(
      isAvatarImagePending('a.png', { src: 'a.png', status: 'idle' }),
    ).toBe(true)
    expect(
      isAvatarImagePending('a.png', { src: 'a.png', status: 'loading' }),
    ).toBe(true)
    expect(
      isAvatarImagePending('a.png', { src: 'a.png', status: 'loaded' }),
    ).toBe(false)
    expect(
      isAvatarImagePending('a.png', { src: 'a.png', status: 'error' }),
    ).toBe(false)
    expect(
      isAvatarImagePending('b.png', { src: 'a.png', status: 'loaded' }),
    ).toBe(true)
  })

  it('is also used by the public profile page', () => {
    const profilePage = readFileSync(
      fileURLToPath(
        new URL(
          '../../app/(root)/(routes)/profile/[nickname]/page.tsx',
          import.meta.url,
        ),
      ),
      'utf8',
    )

    expect(profilePage).toContain('<DmUserAvatar')
    expect(profilePage).not.toContain('<img')
  })
})
