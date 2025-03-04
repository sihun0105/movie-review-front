'use client'

import { AppClientApiEndpoint } from '@/config/app-client-api-endpoint'
import { AppValidation } from '@/config/app-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAppToast } from '@/hooks/use-app-toast'
import { useSession } from 'next-auth/react'
import { useUpdateProfileModalContext } from './use-update-profile-modal-context'
import { useRouter } from 'next/navigation'

const profileSchema = z.object({
  nickname: AppValidation.username(),
  file: z.custom<File>(),
})

const useUpdateProfileForm = () => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: 'onTouched',
    defaultValues: {
      nickname: '',
      file: null as unknown as File,
    },
  })
  const { update } = useSession()

  const [hasEnabledSubmit, setHasEnabledSubmit] = useState(false)
  const [nicknameLength, setNicknameLength] = useState(0)
  const { showToast } = useAppToast()
  const { setOpen } = useUpdateProfileModalContext()
  const router = useRouter()

  const fetchUpdateUsername = async (data: {
    nickname: string
    file: File
  }) => {
    try {
      const formData = new FormData()
      formData.append('nickname', data.nickname)
      formData.append('file', data.file)
      const res = await fetch(AppClientApiEndpoint.updateProfile(), {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
      }

      return res
    } catch (error) {
      showToast('요청이 실패했습니다. 잠시 후 다시 시도해주세요.')
    }
  }
  useEffect(() => {
    const nameValue = form.getValues('nickname')
    setNicknameLength(nameValue.length)

    if (AppValidation.username().safeParse(nameValue).success) {
      setHasEnabledSubmit(true)
    } else {
      setHasEnabledSubmit(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('nickname')])

  const handleSubmit = async (data: z.infer<typeof profileSchema>) => {
    const result = await fetchUpdateUsername({
      nickname: data.nickname,
      file: data.file,
    })
    const isUpdatedProfileSuccess = result?.ok
    if (isUpdatedProfileSuccess) {
      await update({
        nickname: data.nickname,
      })
      setOpen(false)
      showToast('닉네임 변경에 성공했습니다.')
      router.refresh()
      return
    }
    showToast('알 수 없는 이유로 닉네임 변경에 실패했습니다.')
  }

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
    hasEnabledSubmit,
    nicknameLength,
  }
}
export { useUpdateProfileForm }
