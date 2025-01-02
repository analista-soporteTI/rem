import { LoaderCircle } from 'lucide-react'

export const RemDetailLoader = () => (
  <div className='min-h-screen flex items-center justify-center gap-1'>
    <LoaderCircle className='text-green-600 animate-spin mr-2' />
    Estamos cargando los datos
  </div>
)
