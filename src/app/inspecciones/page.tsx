import { ChevronRight, ClipboardCheck, History } from 'lucide-react'
import Link from 'next/link'

export default function InspectionsMenu () {
  return (
    <div className='container mx-auto min-h-[100vh] pt-10 lg:pt-24 pb-10 z-10 w-full gap-10 px-4 sm:px-10 max-[1024px]:pt-20 max-w-7xl'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Menu de inspecciones
          </h1>
          <p className='text-muted-foreground'>
            Aquí podrás ver los diferentes formularios de inspecciones y su
            historial
          </p>
        </div>

        <div className='space-y-4'>
          <Link
            href='/inspecciones/inspeccion-vehiculo'
            className='flex items-center justify-between p-4 bg-card hover:bg-accent rounded-lg border border-input hover:border-accent transition-colors'
          >
            <div className='flex flex-wrap items-center space-x-4'>
              <div className='size-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 max-sm:hidden'>
                <ClipboardCheck className='size-5 text-primary' />
              </div>
              <div>
                <h2 className='text-lg font-semibold'>
                  Inspección de vehículo
                </h2>
                <p className='text-sm text-muted-foreground'>
                  Complete la inspección diaria del vehiculo
                </p>
              </div>
            </div>
            <ChevronRight className='size-5 text-muted-foreground' />
          </Link>

          <Link
            href='/inspecciones/inspeccion-historial'
            className='flex items-center justify-between p-4 bg-card hover:bg-accent rounded-lg border border-input hover:border-accent transition-colors'
          >
            <div className='flex flex-wrap items-center space-x-4'>
              <div className='size-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 max-sm:hidden'>
                <History className='size-5 text-primary' />
              </div>
              <div>
                <h2 className='text-lg font-semibold'>
                  Historial de inspecciones
                </h2>
                <p className='text-sm text-muted-foreground'>
                  Consulte y descargue los documentos de checklist generados
                </p>
              </div>
            </div>
            <ChevronRight className='size-5 text-muted-foreground' />
          </Link>
        </div>
      </div>
    </div>
  )
}
