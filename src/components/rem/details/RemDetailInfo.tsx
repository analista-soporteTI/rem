import { Calendar, Building2, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface RemDetailInfoProps {
  remCode: string
  dateSend: string
  dateRequest: string
  ceco: string
}

export const RemDetailInfo = ({
  remCode,
  dateSend,
  dateRequest,
  ceco
}: RemDetailInfoProps) => (
  <div className='grid gap-6 md:grid-cols-2'>
    <Card>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center gap-2 text-base font-medium'>
          <FileText className='h-4 w-4 text-gray-500' />
          Información de Solicitud
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div>
          <p className='text-sm font-medium text-gray-500'>N° de solicitud</p>
          <p className='mt-1 font-medium'>{remCode}</p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>
            Fecha de solicitud
          </p>
          <p className='mt-1 flex items-center gap-2'>
            <Calendar className='h-4 w-4 text-gray-400' />
            <span>{dateSend}</span>
          </p>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center gap-2 text-base font-medium'>
          <Building2 className='h-4 w-4 text-gray-500' />
          Información de Entrega
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div>
          <p className='text-sm font-medium text-gray-500'>Centro de costo</p>
          <p className='mt-1 font-medium'>{ceco}</p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>Fecha de entrega</p>
          <p className='mt-1 flex items-center gap-2'>
            <Calendar className='h-4 w-4 text-gray-400' />
            <span>{dateRequest}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
)
