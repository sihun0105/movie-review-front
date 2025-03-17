'use client'
import { Form } from '@/components/ui/form'
import { FunctionComponent } from 'react'
import { useUpdateImageFormContext } from './update-image-form-context'
import UpdateImageFormField from './update-image-form-field'
interface UpdateImageFormProps {}

const UpdateImageForm: FunctionComponent<UpdateImageFormProps> = ({}) => {
  const { form } = useUpdateImageFormContext()
  const handleSubmit = form.handleSubmit(async (data) => {})
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <UpdateImageFormField />
        </form>
      </Form>
    </div>
  )
}

export default UpdateImageForm
