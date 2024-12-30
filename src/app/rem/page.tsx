import { RequestTable } from '@/components/RequestTable'

export default function Rem () {
  return (
    <main className='min-h-[100vh] pt-10 lg:pt-24 pb-10 z-10 w-full gap-10 px-4 sm:px-10 max-[1024px]:pt-20 max-w-7xl mx-auto'>
      <h1 id='titleGallery' className='text-3xl font-bold text-start mb-6'>
        Revisa tu solicitud <span className='text-green-600'>REM</span>
      </h1>
      <RequestTable />
    </main>
  )
}
