import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/components/inspections/car/InspectionForm'
import { RadioGroupForm } from '@/components/inspections/RadioGroupForm'
import Image from 'next/image'
import ergonomics from '@/assets/inspections/ergonomics.png'

interface FatigueAndErgonomicsProps {
  form: UseFormReturn<FormData>
}

const FatigueAndErgonomics = ({ form }: FatigueAndErgonomicsProps) => {
  const { control } = form

  const fatigueQuestions = [
    { label: '¿Se siente cansado o fatigado?', name: 'cansado_fatigado' },
    { label: '¿Ha dormido lo suficiente?', name: 'dormido_lo_suficiente' },
    {
      label: '¿Ha consumido alcohol en las últimas 24 horas?',
      name: 'consumo_alcohol'
    },
    {
      label: '¿Ha consumido drogas en las últimas 24 horas?',
      name: 'consumo_drogas'
    },
    {
      label: '¿Está tomando algún medicamento que pueda afectar su conducción?',
      name: 'consumo_medicamento'
    },
    {
      label: '¿Se siente estresado o preocupado?',
      name: 'estresado_preocupado'
    },
    {
      label:
        '¿Tiene algún problema personal que pueda afectar su concentración?',
      name: 'problema_personal'
    },
    {
      label: '¿Se siente en condiciones óptimas para conducir?',
      name: 'condiciones_optimas'
    }
  ]

  const ergonomicsQuestions = [
    {
      label: '¿El asiento está ajustado correctamente?',
      name: 'asiento_ajustado'
    },
    {
      label: '¿Los espejos están bien posicionados?',
      name: 'espejos_posicionados'
    },
    {
      label: '¿El volante está a la altura adecuada?',
      name: 'volante_altura_correcta'
    },
    {
      label: '¿Los pedales están a la distancia correcta?',
      name: 'pedales_distancia_correcta'
    },
    {
      label: '¿La postura de conducción es cómoda?',
      name: 'postura_conduccion_comoda'
    },
    {
      label: '¿La visibilidad es adecuada?',
      name: 'visibilidad_adecuada'
    },
    {
      label: '¿Los controles del vehículo están al alcance?',
      name: 'controles_al_alcance'
    }
  ]

  return (
    <div className='space-y-8'>
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold'>Control de fatiga</h2>
        {fatigueQuestions.map((question, index) => (
          <RadioGroupForm
            key={`fatigue-${index}`}
            label={question.label}
            name={question.name}
            control={control}
            options={[
              { value: 'si', label: 'Sí' },
              { value: 'no', label: 'No' }
            ]}
          />
        ))}
      </div>
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold'>Control de ergonomía</h2>
        <div className='pb-4'>
          {ergonomicsQuestions.map((question, index) => (
            <RadioGroupForm
              key={`ergonomics-${index}`}
              label={question.label}
              name={question.name}
              control={control}
              options={[
                { value: 'si', label: 'Sí' },
                { value: 'no', label: 'No' }
              ]}
            />
          ))}
        </div>
        <figure>
          <Image
            src={ergonomics}
            alt='Imagen de daños en carrocería'
            width={600}
            height={600}
          />
          <figcaption>
            <p className='text-sm text-gray-500 mt-1'>
              Indicación visual de la postura de conducción adecuada
            </p>
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

export default FatigueAndErgonomics
