import { Control, Controller } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface RadioGroupProps {
  label: string
  name: string
  control: Control<any>
  options: { value: string; label: string }[]
}

export const RadioGroupForm = ({
  label,
  name,
  control,
  options
}: RadioGroupProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className='space-y-2'>
          <Label>{label}</Label>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className='flex space-x-4'
          >
            {options.map(option => (
              <div key={option.value} className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={option.value}
                  id={`${name}-${option.value}`}
                />
                <Label htmlFor={`${name}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    />
  )
}
