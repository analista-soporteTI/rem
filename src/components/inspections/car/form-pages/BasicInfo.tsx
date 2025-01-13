import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/components/inspections/car/InspectionForm'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface BasicInfoProps {
  form: UseFormReturn<FormData>
}

export const BasicInfo = ({ form }: BasicInfoProps) => {
  const {
    register,
    formState: { errors }
  } = form

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Información básica</h2>
      <div>
        <Label htmlFor='nombre_conductor'>Nombre del Conductor</Label>
        <Input
          id='nombre_conductor'
          {...register('nombre_conductor')}
          className={errors.nombre_conductor ? 'border-red-500' : ''}
        />
        {errors.nombre_conductor && (
          <p className='text-red-500'>{errors.nombre_conductor.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor='nombre_supervisor'>Nombre del Supervisor o APR</Label>
        <Input
          id='nombre_supervisor'
          {...register('nombre_supervisor')}
          className={errors.nombre_supervisor ? 'border-red-500' : ''}
        />
        {errors.nombre_supervisor && (
          <p className='text-red-500'>{errors.nombre_supervisor.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor='patente_vehiculo'>Patente del Vehículo</Label>
        <Input
          id='patente_vehiculo'
          {...register('patente_vehiculo')}
          className={errors.patente_vehiculo ? 'border-red-500' : ''}
        />
        {errors.patente_vehiculo && (
          <p className='text-red-500'>{errors.patente_vehiculo.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor='km_actual'>Kilómetros Actuales</Label>
        <Input
          id='km_actual'
          type='number'
          {...register('km_actual')}
          className={errors.km_actual ? 'border-red-500' : ''}
        />
        {errors.km_actual && (
          <p className='text-red-500'>{errors.km_actual.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor='km_mantencion'>Kilómetros para Mantención</Label>
        <Input
          id='km_mantencion'
          type='number'
          {...register('km_mantencion')}
        />
      </div>
    </div>
  )
}
