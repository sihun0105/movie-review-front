export const AppConstants = {
  imageFormat: [
    '.jpeg',
    '.jpg',
    '.png',
    '.webp',
    '.heic',
    '.heif',
    'webp',
  ] as const,
  profileImageLimitSize: {
    size: 1024 * 1024 * 20,
  },
} as const
