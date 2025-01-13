import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/components/inspections/car/InspectionForm'
import { RadioGroupForm } from '@/components/inspections/RadioGroupForm'

interface LevelsProps {
  form: UseFormReturn<FormData>
}

export const Levels = ({ form }: LevelsProps) => {
  const { control } = form

  const levels = [
    {
      label: 'Nivel de Agua del Parabrisas',
      name: 'niveles.nivel_agua_parabrisas'
    },
    {
      label: 'Nivel de Agua Refrigerante',
      name: 'niveles.nivel_agua_refrigerante'
    },
    { label: 'Nivel de Aceite', name: 'niveles.nivel_aceite' },
    {
      label: 'Nivel de Líquido de Frenos',
      name: 'niveles.nivel_liquido_de_frenos'
    }
  ]

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Niveles</h2>
      {levels.map(level => (
        <RadioGroupForm
          key={level.name}
          label={level.label}
          name={level.name}
          control={control}
          options={[
            { value: 'En buen estado', label: 'En buen estado' },
            { value: 'En mal estado', label: 'En mal estado' }
          ]}
        />
      ))}
    </div>
  )
}
