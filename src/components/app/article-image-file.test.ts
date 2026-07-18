import { describe, expect, it, vi } from 'vitest'
import {
  ARTICLE_IMAGE_MAX_BYTES,
  getArticleImageUploadError,
  prepareArticleImage,
} from './article-image-file'

describe('prepareArticleImage', () => {
  it('keeps an animated GIF unchanged', async () => {
    const gif = new File(['gif89a'], 'reaction.gif', { type: 'image/gif' })
    const convertHeic = vi.fn()

    const result = await prepareArticleImage(gif, convertHeic)

    expect(result).toBe(gif)
    expect(convertHeic).not.toHaveBeenCalled()
  })

  it('converts an iPhone HEIC file even when its MIME type is empty', async () => {
    const heic = new File(['heic'], 'IMG_0001.HEIC')
    const jpeg = new File(['jpeg'], 'IMG_0001.jpg', { type: 'image/jpeg' })
    const convertHeic = vi.fn().mockResolvedValue(jpeg)

    await expect(prepareArticleImage(heic, convertHeic)).resolves.toBe(jpeg)
    expect(convertHeic).toHaveBeenCalledWith(heic)
  })

  it('rejects files larger than the upload limit', async () => {
    const oversized = {
      name: 'large.gif',
      type: 'image/gif',
      size: ARTICLE_IMAGE_MAX_BYTES + 1,
    } as File

    await expect(prepareArticleImage(oversized, vi.fn())).rejects.toThrow(
      '20MB 이하',
    )
  })

  it('rejects image formats that browsers cannot display', async () => {
    const raw = new File(['raw'], 'IMG_0002.DNG', {
      type: 'image/x-adobe-dng',
    })

    await expect(prepareArticleImage(raw, vi.fn())).rejects.toThrow(
      '지원하지 않는 이미지 형식',
    )
  })

  it('explains a reverse-proxy size rejection', () => {
    expect(getArticleImageUploadError(413)).toBe(
      '이미지는 20MB 이하만 업로드할 수 있어요.',
    )
  })
})
