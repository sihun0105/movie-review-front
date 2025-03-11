'use client'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FunctionComponent } from 'react'
import { useUpdateProfileForm } from '../hooks/use-update-profile-form'
import { useUpdateProfileModalContext } from '../hooks/use-update-profile-modal-context'
import UpdateNicknameField from './update-nickname-field'
import ProfileImageUpdateField from './update-image-field'
interface UpdateProfileModalFormProps {}

const UpdateProfileForm: FunctionComponent<
  UpdateProfileModalFormProps
> = () => {
  const { form, hasEnabledSubmit, handleSubmit } = useUpdateProfileForm()
  const { setOpen } = useUpdateProfileModalContext()
  return (
    <section className="mt-0">
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <section className="mb-3 flex flex-col gap-4 ">
            <ProfileImageUpdateField form={form} />
            <UpdateNicknameField form={form} />
          </section>
          <section className="flex w-full items-center justify-center gap-[12px]">
            <Button
              type="button"
              onClick={() => {
                form.resetField('nickname')
                form.resetField('file')
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

export { UpdateProfileForm }
