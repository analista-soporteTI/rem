import { RemCatalog } from '@/components/rem/RemCatalog'
import { fetchRem } from '@/lib/db/fetchRems'

export default async function RemCatalogPage () {
  const rems = await fetchRem()

  return (
    <main className='max-w-[1232px] mx-auto w-full pt-20 px-4 pb-10 sm:px-6'>
      <h1 className='font-bold text-3xl mb-4'>
        Seguimiento <span className='text-green-600'>REM</span>
      </h1>

      <RemCatalog data={rems} />
    </main>
  )
}
