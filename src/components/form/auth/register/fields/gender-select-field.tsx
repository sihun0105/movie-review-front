'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useRegisterFormContext } from '../hook/register-form-context'
import { FunctionComponent } from 'react'

interface GenderSelectFieldProps {}

const GenderSelectField: FunctionComponent<GenderSelectFieldProps> = () => {
  const { form } = useRegisterFormContext()

  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-base font-medium">성별</FormLabel>
          <FormControl>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => field.onChange('female')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all duration-200 ${
                  field.value === 'female'
                    ? 'border-pink-400 bg-pink-50 text-pink-700'
                    : 'hover:bg-pink-25 border-gray-200 bg-white text-gray-600 hover:border-pink-200'
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    field.value === 'female' ? 'text-pink-500' : 'text-gray-400'
                  }
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M12 12v10m-4 6h8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-medium">여성</span>
              </button>

              <button
                type="button"
                onClick={() => field.onChange('male')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all duration-200 ${
                  field.value === 'male'
                    ? 'border-blue-400 bg-blue-50 text-blue-700'
                    : 'hover:bg-blue-25 border-gray-200 bg-white text-gray-600 hover:border-blue-200'
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    field.value === 'male' ? 'text-blue-500' : 'text-gray-400'
                  }
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M12 12v10m-4 6h8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17 3l4 4m0-4l-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-medium">남성</span>
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { GenderSelectField }
