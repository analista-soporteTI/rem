import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { RemDetailStatus } from '@/components/rem/details/RemDetailStatus'

interface RemDetailHeaderProps {
  remCode: string
  status: string
  onStatusChange: (value: string) => void
}

export const RemDetailHeader = ({
  remCode,
  status,
  onStatusChange
}: RemDetailHeaderProps) => (
  <div className='flex flex-wrap items-center gap-4'>
    <Link
      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
      href='/seguimiento'
    >
      <ArrowLeft className='h-5 w-5' />
      <span className='sr-only'>Volver al seguimiento</span>
    </Link>
    <div className='flex-1'>
      <h1 className='text-xl font-semibold text-gray-900'>REM {remCode}</h1>
      <p className='text-sm text-gray-500'>Detalles de la solicitud</p>
    </div>
    <RemDetailStatus
      remCode={remCode}
      value={status}
      onValueChange={onStatusChange}
    />
  </div>
)
