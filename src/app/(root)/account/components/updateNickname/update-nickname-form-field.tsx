'use client'
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import { FunctionComponent } from 'react'
import { useUpdateNicknameFormContext } from './update-nickname-form-context'
import { useUpdateNicknameForm } from '../../hooks/use-update-nickname-form'
interface UpdateNicknameFieldProps {}

const UpdateNicknameField: FunctionComponent<
  UpdateNicknameFieldProps
> = ({}) => {
  const { form } = useUpdateNicknameFormContext()
  const { nicknameLength } = useUpdateNicknameForm()
  const userData = useSession()
  const MAX_LENGTH = 15
  return (
    <FormField
      control={form.control}
      name="nickname"
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <section className="relative">
                <Input
                  placeholder={
                    userData.data?.user.nickname ?? '닉네임을 입력해주세요.'
                  }
                  {...field}
                />
              </section>
            </FormControl>
            <FormMessage />
            <section className="flex w-full justify-end text-xs font-normal text-app-gray-005">
              <p>
                {nicknameLength}/{MAX_LENGTH}
              </p>
            </section>
          </FormItem>
        )
      }}
    />
  )
}

export default UpdateNicknameField
