import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/components/inspections/car/InspectionForm'
import { RadioGroupForm } from '@/components/inspections/RadioGroupForm'

interface TiresProps {
  form: UseFormReturn<FormData>
}

export const Tires = ({ form }: TiresProps) => {
  const { control } = form

  const tires = [
    {
      label: 'Neumático Delantero Izquierdo',
      name: 'neumaticos.neumatico_delantero_izquierdo'
    },
    {
      label: 'Neumático Delantero Derecho',
      name: 'neumaticos.neumatico_delantero_derecho'
    },
    {
      label: 'Neumático Trasero Izquierdo',
      name: 'neumaticos.neumatico_trasero_izquierdo'
    },
    {
      label: 'Neumático Trasero Derecho',
      name: 'neumaticos.neumatico_trasero_derecho'
    },
    { label: 'Neumático de Repuesto', name: 'neumaticos.neumatico_repuesto' }
  ]

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>
        Inspección visual de los neumáticos
      </h2>
      {tires.map(tire => (
        <RadioGroupForm
          key={tire.name}
          label={tire.label}
          name={tire.name}
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
