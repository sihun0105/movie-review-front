import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { AppDatePicker } from '@/components/app/app-date-picker'
import { FunctionComponent, HTMLAttributes } from 'react'
import { useMatchPostFormContext } from '../hooks/match-post-form-context'

interface ShowTimeInputFieldProps extends HTMLAttributes<HTMLDivElement> {}

const ShowTimeInputField: FunctionComponent<ShowTimeInputFieldProps> = () => {
  const { form } = useMatchPostFormContext()

  return (
    <FormField
      control={form.control}
      name="showTime"
      render={({ field }) => {
        const currentValue = field.value ? new Date(field.value) : undefined

        const handleDateChange = (date?: Date) => {
          if (date) {
            // YYYY-MM-DD 형식으로 변환
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            field.onChange(`${year}-${month}-${day}`)
          } else {
            field.onChange(undefined)
          }
        }

        return (
          <FormItem>
            <FormLabel>상영 시간</FormLabel>
            <FormControl>
              <AppDatePicker
                value={currentValue}
                onChange={handleDateChange}
                placeholder="날짜를 선택하세요"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

export { ShowTimeInputField }
