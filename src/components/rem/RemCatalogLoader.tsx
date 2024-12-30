import { LoaderCircle } from 'lucide-react'
import { SkeletonCard } from '@/components/SkeletonCard'

export const RemCatalogLoader = () => (
  <div className='relative'>
    <div className='absolute z-10 top-0 left-0 right-0 h-full w-full flex items-center justify-center'>
      <div className='flex items-center justify-center gap-1'>
        Estamos cargando los datos
        <LoaderCircle className='text-green-600 animate-spin' />
      </div>
    </div>
    <div className='flex flex-wrap gap-4'>
      {Array(8)
        .fill(null)
        .map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
    </div>
  </div>
)
