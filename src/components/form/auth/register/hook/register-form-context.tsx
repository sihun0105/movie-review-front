'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createContext, useContext, useState } from 'react'
import * as z from 'zod'
import { auth } from '@/modules/auth'

const formSchema = z.object({
  userId: z
    .string()
    .min(1, {
      message: '이메일을 입력해주세요.',
    })
    .email({
      message: '올바른 이메일 형식을 입력해주세요.',
    }),
  password: z
    .string()
    .min(8, {
      message: '비밀번호는 최소 8자 이상이어야 합니다.',
    })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
      message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
    }),
  nickname: z
    .string()
    .min(2, {
      message: '닉네임은 최소 2자 이상이어야 합니다.',
    })
    .max(10, {
      message: '닉네임은 최대 10자까지 가능합니다.',
    }),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: '이용약관에 동의해주세요.',
  }),
})

const useRegisterForm = () => {
  const [emailValidationState, setEmailValidationState] = useState({
    isValidating: false,
    isValid: false,
  })
  const [nicknameValidationState, setNicknameValidationState] = useState({
    isValidating: false,
    isValid: false,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: {
      userId: '',
      password: '',
      nickname: '',
      termsAgreed: false,
    },
  })

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    onSuccess: () => void,
    onError: (error: string) => void,
  ) => {
    try {
      // 새로운 auth 모듈을 사용한 회원가입 처리
      const result = await auth.register({
        userId: values.userId,
        password: values.password,
        nickname: values.nickname,
        marketingAgreed: values.marketingAgreed,
      })

      if (result.success) {
        onSuccess()
      } else {
        onError(result.message || '회원가입에 실패했습니다.')
      }
    } catch (error) {
      console.error('Register submit error:', error)
      onError('회원가입 중 오류가 발생했습니다.')
    }
  }

  return {
    form,
    onSubmit,
    emailValidationState,
    setEmailValidationState,
    nicknameValidationState,
    setNicknameValidationState,
  }
}

const RegisterFormContext = createContext<ReturnType<
  typeof useRegisterForm
> | null>(null)

export const useRegisterFormContext = () => {
  const context = useContext(RegisterFormContext)
  if (!context) {
    throw new Error('useRegisterFormContext가 없습니다.')
  }
  return context
}

export const RegisterFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const {
    form,
    onSubmit,
    emailValidationState,
    setEmailValidationState,
    nicknameValidationState,
    setNicknameValidationState,
  } = useRegisterForm()
  return (
    <RegisterFormContext.Provider
      value={{
        form,
        onSubmit,
        emailValidationState,
        setEmailValidationState,
        nicknameValidationState,
        setNicknameValidationState,
      }}
    >
      {children}
    </RegisterFormContext.Provider>
  )
}
