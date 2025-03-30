'use client'
import { Form } from '@/components/ui/form'
import { useSession } from 'next-auth/react'
import { FunctionComponent, useRef } from 'react'
import { useUpdateImageForm } from '../../hooks/use-update-image-form'
import { useUpdateImageFormContext } from './update-image-form-context'
import UpdateImageFormField from './update-image-form-field'
interface UpdateImageFormProps {}

const UpdateImageForm: FunctionComponent<UpdateImageFormProps> = ({}) => {
  const { form } = useUpdateImageFormContext()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { handleSubmit, setFile, imageUrl, loading } = useUpdateImageForm()
  const currentImage = useSession().data?.user?.image ?? ''
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <UpdateImageFormField
            setFile={setFile}
            fileInputRef={fileInputRef}
            loading={loading}
            imageUrl={imageUrl}
            currentImage={currentImage}
          />
        </form>
      </Form>
    </div>
  )
}

export default UpdateImageForm
