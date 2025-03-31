import heic2any from 'heic2any'
import { useCallback } from 'react'

export const useTranslateHeicToJpg = () => {
  const translate = useCallback(async (file: File) => {
    try {
      const blobs = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.5,
      })

      const blob = Array.isArray(blobs) ? blobs[0] : blobs

      return new File([blob], file.name.replace(/\.heic$/, '.jpg'), {
        type: 'image/jpeg',
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }, [])

  return { translate }
}
