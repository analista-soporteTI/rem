import { UseFormReturn } from 'react-hook-form'
import { FormData } from '../InspectionForm'
import { RadioGroupForm } from '@/components/inspections/RadioGroupForm'
import Image from 'next/image'
import bodyDamage from '@/assets/inspections/body-damage.png'

interface BodyDamageProps {
  form: UseFormReturn<FormData>
}

export const BodyDamage = ({ form }: BodyDamageProps) => {
  const { control } = form

  const damages = [
    { label: 'Lado del Conductor', name: 'dañosCarroceria.lado_conductor' },
    { label: 'Lado del Pasajero', name: 'dañosCarroceria.lado_pasajero' },
    { label: 'Lado Frontal', name: 'dañosCarroceria.lado_frontal' },
    { label: 'Lado Posterior', name: 'dañosCarroceria.lado_posterior' }
  ]

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Daños en carrocería</h2>
      <div className='pb-4'>
        {damages.map(damage => (
          <RadioGroupForm
            key={damage.name}
            label={damage.label}
            name={damage.name}
            control={control}
            options={[
              { value: 'si', label: 'Sí' },
              { value: 'no', label: 'No' }
            ]}
          />
        ))}
      </div>
      <figure className='mt-4'>
        <Image
          src={bodyDamage}
          alt='Imagen de daños en carrocería'
          width={600}
          height={600}
        />
        <figcaption>
          <p className='text-sm text-gray-500 mt-1'>
            Indicación visual de zonas a las que se debe prestar atención
          </p>
        </figcaption>
      </figure>
    </div>
  )
}
