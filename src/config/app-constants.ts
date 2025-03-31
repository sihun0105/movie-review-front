export const AppConstants = {
  imageFormat: ['.jpeg', '.jpg', '.png', '.webp', '.heic'] as const,
  profileImageLimitSize: {
    size: 1024 * 1024 * 20,
    label: '20MB',
  },
} as const
