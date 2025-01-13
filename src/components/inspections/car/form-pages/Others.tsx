import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/components/inspections/car/InspectionForm'
import { RadioGroupForm } from '@/components/inspections/RadioGroupForm'

interface OthersProps {
  form: UseFormReturn<FormData>
}

export const Others = ({ form }: OthersProps) => {
  const { control } = form

  const items = [
    { label: 'Sistema de Calefacción', name: 'otros.sistema_calefaccion' },
    { label: 'Aire Acondicionado', name: 'otros.aire_acondicionado' },
    { label: 'Freno de Mano', name: 'otros.freno_mano' },
    { label: 'Condiciones de Asientos', name: 'otros.condiciones_asientos' },
    {
      label: 'Apoyo de Cabeza Ajustable',
      name: 'otros.apoyo_cabeza_ajustable'
    },
    { label: 'Radio Estéreo', name: 'otros.radio_estereo' },
    { label: 'Bocina', name: 'otros.bocina' },
    {
      label: 'Alarma Sonora de Retroceso',
      name: 'otros.alarma_sonora_retroceso'
    },
    { label: 'Orden y Limpieza', name: 'otros.orden_limpieza' },
    { label: 'Estado de Patente', name: 'otros.estado_patente' }
  ]

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Otros</h2>
      {items.map(item => (
        <RadioGroupForm
          key={item.name}
          label={item.label}
          name={item.name}
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
