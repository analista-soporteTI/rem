import { Clock, CheckCircle, XCircle, Info, MessageSquareWarning } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface RemDetailSelectProps {
  value: string
  onValueChange: (value: string) => void
  disabled?: boolean
}

export const RemDetailSelect = ({
  value,
  onValueChange,
  disabled
}: RemDetailSelectProps) => (
  <Select value={value} onValueChange={onValueChange} disabled={disabled}>
    <SelectTrigger className='max-w-[230px]'>
      <SelectValue placeholder='Elegir un estado' />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value='Pendiente Aprobación'>
        <span className='flex items-center gap-2'>
          <MessageSquareWarning className='size-4 text-purple-600' />
          Pendiente Aprobación
        </span>
      </SelectItem>
      <SelectItem value='Pendiente'>
        <span className='flex items-center gap-2'>
          <Info className='size-4 text-yellow-600' />
          Pendiente
        </span>
      </SelectItem>
      <SelectItem value='En Proceso'>
        <span className='flex items-center gap-2'>
          <Clock className='size-4 text-blue-600' />
          En Proceso
        </span>
      </SelectItem>
      <SelectItem value='Completado'>
        <span className='flex items-center gap-2'>
          <CheckCircle className='size-4 text-green-600' />
          Completado
        </span>
      </SelectItem>
      <SelectItem value='Anulado'>
        <span className='flex items-center gap-2'>
          <XCircle className='size-4 text-red-600' />
          Anulado
        </span>
      </SelectItem>
    </SelectContent>
  </Select>
)
