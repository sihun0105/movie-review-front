export const ARTICLE_IMAGE_MAX_BYTES = 20 * 1024 * 1024

const MIME_BY_EXTENSION: Record<string, string> = {
  avif: 'image/avif',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

type HeicConverter = (_file: File) => Promise<File>

export async function prepareArticleImage(
  file: File,
  convertHeic: HeicConverter = convertHeicToJpeg,
): Promise<File> {
  validateSize(file)
  const extension = getExtension(file.name)

  if (isHeic(file, extension)) {
    const converted = await convertHeic(file)
    validateSize(converted)
    return converted
  }

  const inferredType = MIME_BY_EXTENSION[extension]
  const genericType = !file.type || file.type === 'application/octet-stream'
  const supportedType = Object.values(MIME_BY_EXTENSION).includes(file.type)

  if (!supportedType && !(genericType && inferredType)) {
    throw new Error('지원하지 않는 이미지 형식이에요.')
  }

  return genericType && inferredType
    ? new File([file], file.name, { type: inferredType })
    : file
}

export function getArticleImageUploadError(
  status: number,
  message?: string,
): string {
  if (status === 413) return '이미지는 20MB 이하만 업로드할 수 있어요.'
  if (status === 401) return '로그인 후 이미지를 추가해주세요.'
  return message || '이미지 업로드에 실패했어요.'
}

async function convertHeicToJpeg(file: File): Promise<File> {
  try {
    const { default: heic2any } = await import('heic2any')
    const result = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.85,
    })
    const blob = Array.isArray(result) ? result[0] : result
    const name = file.name.replace(/\.(heic|heif)$/i, '') || 'image'
    return new File([blob], `${name}.jpg`, { type: 'image/jpeg' })
  } catch {
    throw new Error('아이폰 사진을 변환하지 못했어요. 다른 사진을 선택해주세요.')
  }
}

function validateSize(file: Pick<File, 'size'>) {
  if (file.size > ARTICLE_IMAGE_MAX_BYTES) {
    throw new Error('이미지는 20MB 이하만 업로드할 수 있어요.')
  }
}

function getExtension(name: string): string {
  return name.split('.').pop()?.toLowerCase() ?? ''
}

function isHeic(file: File, extension: string): boolean {
  return (
    extension === 'heic' ||
    extension === 'heif' ||
    file.type.includes('heic') ||
    file.type.includes('heif')
  )
}
