import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { useAppToast } from '@/hooks/use-app-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUpdateImageFormContext } from '../components/updateImage/update-image-form-context'
import { useCheckImageSize } from './use-check-image-size'
import { useUpdateProfileModalContext } from './use-update-profile-modal-context'
import { update } from 'lodash'

const useUpdateImageForm = () => {
  const { form } = useUpdateImageFormContext()
  const { update: updateSession } = useSession()
  const { checkImageSize } = useCheckImageSize()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const { setOpen } = useUpdateProfileModalContext()
  const { showToast } = useAppToast()

  const router = useRouter()

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      form.setValue('file', file)
      return () => {
        URL.revokeObjectURL(url)
        setImageUrl(null)
      }
    }
  }, [file])

  useEffect(() => {
    if (!file || loading) return

    if (!checkImageSize(file)) {
      setFile(null)
      showToast('이미지 크기가 너무 큽니다.')
      return
    }

    const update = async () => {
      try {
        await handleSubmit({ file })
        router.refresh()
      } catch (error) {
        showToast('프로필 이미지 변경에 실패했습니다.')
      }
    }

    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])
  const fetchupdateProfileImage = async (data: { file?: File }) => {
    console.log('fetchupdateProfileImage', data)
    if (!data.file) return null

    try {
      const formData = new FormData()
      formData.append('file', data.file)

      const res = await fetch(AppClientApiEndpoint.updateImage(), {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        console.log(res)
      }
      return res
    } catch (error) {
      showToast('요청이 실패했습니다.')
    }
  }

  const handleSubmit = async (data: { file: File }) => {
    if (!data.file) return

    try {
      const result = await fetchupdateProfileImage({ file: data.file })
      if (result?.ok) {
        const responseData = await result.json()

        await updateSession({ image: responseData.image })
        setOpen(false)
        setImageUrl(responseData.image)
        showToast('프로필 이미지 업데이트에 성공했습니다.')
        router.refresh()
      } else {
        showToast('프로필 이미지 업데이트에 실패했습니다.')
      }
    } catch (error) {
      showToast('프로필 이미지 변경 중 오류가 발생했습니다.')
    }
  }

  return {
    showToast,
    setOpen,
    router,
    update,
    handleSubmit: form.handleSubmit(handleSubmit),
    imageUrl,
    setFile,
    file,
    checkImageSize,
    loading,
  }
}

export { useUpdateImageForm }
