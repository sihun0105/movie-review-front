import { FunctionComponent } from 'react'
import { useUpdateProfileForm } from '../hooks/use-update-profile-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUpdateProfileModalContext } from '../hooks/use-update-profile-modal-context'
import { useSession } from 'next-auth/react'
interface ChangeNameModalFormProps {}

const ChangeNameForm: FunctionComponent<ChangeNameModalFormProps> = () => {
  const { form, hasEnabledSubmit, nicknameLength, handleSubmit } =
    useUpdateProfileForm()
  const userData = useSession()

  const isError = !!form.formState.errors.nickname
  const { setOpen } = useUpdateProfileModalContext()
  const MAX_LENGTH = 15
  return (
    <section className="mt-0">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <section className="mb-3 flex flex-col gap-4 ">
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
                            userData.data?.user.nickname ??
                            '닉네임을 입력해주세요.'
                          }
                          {...field}
                        />
                        <Button
                          disabled={isError}
                          onClick={() => {}}
                          className="absolute right-2 top-0 h-full px-4 hover:bg-transparent"
                          type={'button'}
                          variant={'ghost'}
                        ></Button>
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
          </section>
          <section className="flex w-full items-center justify-center gap-[12px]">
            <Button
              type="button"
              onClick={() => {
                form.resetField('nickname')
                setOpen(false)
              }}
              size={'form'}
              className="basis-full"
              variant={'light-gray'}
            >
              취소
            </Button>
            <Button
              type="submit"
              size={'form'}
              className="basis-full"
              disabled={!hasEnabledSubmit}
            >
              확인
            </Button>
          </section>
        </form>
      </Form>
    </section>
  )
}

export { ChangeNameForm }
