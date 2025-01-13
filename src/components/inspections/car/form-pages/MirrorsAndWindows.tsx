import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/components/inspections/car/InspectionForm'
import { RadioGroupForm } from '@/components/inspections/RadioGroupForm'

interface MirrorsAndWindowsProps {
  form: UseFormReturn<FormData>
}

export const MirrorsAndWindows = ({ form }: MirrorsAndWindowsProps) => {
  const { control } = form

  const items = [
    {
      label: 'Parabrisas Delantero',
      name: 'estadoEspejos.parabrisas_delantero'
    },
    { label: 'Parabrisas Trasero', name: 'estadoEspejos.parabrisas_trasero' },
    {
      label: 'Plumillas Limpiaparabrisas',
      name: 'estadoEspejos.plumillas_limpiaBrisas'
    },
    {
      label: 'Alza Vidrio Delantero',
      name: 'estadoEspejos.alza_vidrio_delantero'
    },
    { label: 'Alza Vidrio Trasero', name: 'estadoEspejos.alza_vidrio_trasero' },
    { label: 'Retrovisor Interior', name: 'estadoEspejos.retrovisor_interior' },
    {
      label: 'Espejo Retrovisor Derecho',
      name: 'estadoEspejos.espejo_retrovisor_derecho'
    },
    {
      label: 'Espejo Retrovisor Izquierdo',
      name: 'estadoEspejos.espejo_retrovisor_izquierdo'
    },
    {
      label: 'Manillas Alza Vidrios',
      name: 'estadoEspejos.manillas_alza_vidrios'
    }
  ]

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Estado de vidrios y espejos</h2>
      {items.map(item => (
        <RadioGroupForm
          key={item.name}
          label={item.label}
          name={item.name}
          control={control}
          options={[
            { value: 'si', label: 'Sí' },
            { value: 'no', label: 'No' }
          ]}
        />
      ))}
    </div>
  )
}
