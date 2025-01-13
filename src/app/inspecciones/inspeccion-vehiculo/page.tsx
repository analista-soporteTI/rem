import { InspectionForm } from '@/components/inspections/car/InspectionForm'
import { buttonVariants } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function InspectionsCar () {
  return (
    <main className='min-h-[100vh] pt-10 lg:pt-24 pb-10 z-10 w-full gap-10 px-4 sm:px-10 max-[1024px]:pt-20 max-w-7xl mx-auto'>
      <Link
        href='/inspecciones'
        className={buttonVariants({
          variant: 'outline',
          className: 'mb-6 gap-2'
        })}
      >
        <ArrowLeft className='size-4' />
        Volver al menu
      </Link>
      <h1 id='titleGallery' className='text-3xl font-bold text-start mb-4'>
        Formulario inspección de <span className='text-green-600'>vehículo</span>
      </h1>
      <p className='mb-6'>Complete la inspección diaria del vehículo</p>
      <InspectionForm />
    </main>
  )
}
