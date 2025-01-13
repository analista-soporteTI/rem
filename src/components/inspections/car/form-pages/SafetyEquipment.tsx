import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/components/inspections/car/InspectionForm'
import { RadioGroupForm } from '@/components/inspections/RadioGroupForm'

interface SafetyEquipmentProps {
  form: UseFormReturn<FormData>
}

export const SafetyEquipment = ({ form }: SafetyEquipmentProps) => {
  const { control } = form

  const equipment = [
    { label: 'Triángulos', name: 'equipoSeguridad.triangulos' },
    { label: 'Botiquín', name: 'equipoSeguridad.botiquin' },
    { label: 'Cinturones', name: 'equipoSeguridad.cinturones' },
    { label: 'Baliza', name: 'equipoSeguridad.baliza' },
    {
      label: 'Cadena de Seguridad',
      name: 'equipoSeguridad.cadena_de_seguridad'
    },
    {
      label: 'Cierre Centralizado',
      name: 'equipoSeguridad.cierre_centralizado'
    },
    { label: 'Cuñas', name: 'equipoSeguridad.cuñas' },
    { label: 'Extintores', name: 'equipoSeguridad.extintores' },
    { label: 'Gata', name: 'equipoSeguridad.gata' },
    { label: 'Llave de Rueda', name: 'equipoSeguridad.llave_de_rueda' },
    { label: 'Kit de Extensiones', name: 'equipoSeguridad.kit_extensiones' },
    { label: 'Barra Antivuelco', name: 'equipoSeguridad.barra_antivuelco' },
    {
      label: 'Chaleco Reflectante',
      name: 'equipoSeguridad.chaleco_reflectante'
    },
    { label: 'Traba Volante', name: 'equipoSeguridad.traba_volante' },
    {
      label: 'Sistema de Bloqueo de Rueda',
      name: 'equipoSeguridad.sistema_bloqueo_de_rueda'
    }
  ]

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Estado de equipo de seguridad</h2>
      {equipment.map(item => (
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
