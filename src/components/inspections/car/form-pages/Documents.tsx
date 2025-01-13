import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/components/inspections/car/InspectionForm'
import { RadioGroupForm } from '@/components/inspections/RadioGroupForm'

interface DocumentsProps {
  form: UseFormReturn<FormData>
}

export const Documents = ({ form }: DocumentsProps) => {
  const { control } = form

  const documents = [
    { label: 'Licencia', name: 'documentos.licencia' },
    { label: 'Permiso de Circulación', name: 'documentos.permiso_circulacion' },
    { label: 'Revisión Técnica', name: 'documentos.revision_tecnica' },
    { label: 'SOAP', name: 'documentos.soap' },
    { label: 'Mantención', name: 'documentos.mantencion' }
  ]

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Documentos al día</h2>
      {documents.map(doc => (
        <RadioGroupForm
          key={doc.name}
          label={doc.label}
          name={doc.name}
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

export default Documents
