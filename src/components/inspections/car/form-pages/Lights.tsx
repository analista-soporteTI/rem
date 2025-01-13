import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/components/inspections/car/InspectionForm'
import { RadioGroupForm } from '@/components/inspections/RadioGroupForm'

interface LightsProps {
  form: UseFormReturn<FormData>
}

export const Lights = ({ form }: LightsProps) => {
  const { control } = form

  const lights = [
    {
      label: 'Luces Intermitentes Derecha',
      name: 'estadoLuces.luces_intermitentes_derecha'
    },
    {
      label: 'Luces Intermitentes Izquierda',
      name: 'estadoLuces.luces_intermitentes_izquierda'
    },
    { label: 'Luces de Freno', name: 'estadoLuces.luces_freno' },
    { label: 'Luces de Retroceso', name: 'estadoLuces.luces_retroceso' },
    { label: 'Luces de Emergencia', name: 'estadoLuces.luces_emergencia' },
    { label: 'Luces Altas', name: 'estadoLuces.luces_altas' },
    { label: 'Luces Bajas', name: 'estadoLuces.luces_bajas' },
    { label: 'Neblineros Bajos', name: 'estadoLuces.neblineros_bajos' },
    { label: 'Luces de Tablero', name: 'estadoLuces.luces_tablero' },
    { label: 'Luz Interior', name: 'estadoLuces.luz_interior' }
  ]

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Estado de las Luces</h2>
      {lights.map(light => (
        <RadioGroupForm
          key={light.name}
          label={light.label}
          name={light.name}
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
