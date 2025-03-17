'use client'
import { Form } from '@/components/ui/form'
import { FunctionComponent } from 'react'
import { useUpdateNicknameFormContext } from './update-nickname-form-context'
import UpdateNicknameField from './update-nickname-form-field'
import { useUpdateNicknameForm } from '../../hooks/use-update-nickname-form'
import { Button } from '@/components/ui/button'
import { useUpdateProfileModalContext } from '../../hooks/use-update-profile-modal-context'
interface UpdateNicknameFormProps {}

const UpdateNicknameForm: FunctionComponent<UpdateNicknameFormProps> = ({}) => {
  const { form } = useUpdateNicknameFormContext()
  const { handleSubmit, hasEnabledSubmit } = useUpdateNicknameForm()
  const { setOpen } = useUpdateProfileModalContext()
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <UpdateNicknameField />
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
    </div>
  )
}

export default UpdateNicknameForm
