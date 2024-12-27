import { ProductCatalog } from '@/components/product/ProductCatalog'
import { ArrowUp } from 'lucide-react'
import Link from 'next/link'

export default function Home () {
  return (
    <main className='max-w-7xl mx-auto w-full pt-20 px-4 pb-2 sm:px-6 sm:pb-4'>
      <h1 className='font-bold text-3xl mb-4'>
        Catálogo <span className='text-green-600'>REM</span>
      </h1>
      <ProductCatalog />
      <Link
        href='#customSearchAlgolia'
        className='fixed bottom-12 right-4 z-40 w-fit p-1 border border-border rounded-xl bg-background group'
      >
        <ArrowUp
          size={24}
          className='text-gray-400 group-hover:text-gray-500'
        />
      </Link>
    </main>
  )
}
