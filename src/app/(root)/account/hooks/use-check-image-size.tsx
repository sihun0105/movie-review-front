import { AppConstants } from '@/config/app-constants'

export const useCheckImageSize = () => {
  const checkImageSize = (file: File) => {
    if (file.size > AppConstants.profileImageLimitSize.size) {
      return false
    }
    return true
  }

  return {
    checkImageSize,
  }
}
