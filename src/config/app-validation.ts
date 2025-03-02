import { z } from 'zod'

const AppValidation = {
  username: (message?: string) =>
    z
      .string()
      .min(2, {
        message: message ?? '이름은 2글자 이상입니다.',
      })
      .max(15, {
        message: message ?? '이름은 15글자 이하입니다.',
      }),
  email: (message?: string) =>
    z.string().email({
      message: message ?? '이메일 주소를 확인해주세요.',
    }),
  password: (message?: string) =>
    z.string().regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/, {
      message: message ?? '비밀번호 조건을 확인해주세요.',
    }),
  phone: (message?: string) =>
    z.string().regex(/^[0-9]{3}[0-9]{4}[0-9]{4}$/, {
      message: message ?? '휴대폰 번호를 확인해주세요. (숫자만 입력해주세요.)',
    }),
  imageFile: (message?: string) =>
    z.string().regex(/(.*?)\.(jpg|jpeg|png|gif)$/, {
      message: message ?? '이미지 파일만 업로드 가능합니다.',
    }),
}

export { AppValidation }
