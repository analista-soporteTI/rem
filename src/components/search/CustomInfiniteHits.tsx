'use client'

import { useRef, useEffect } from 'react'
import { useInfiniteHits } from 'react-instantsearch'
import { HitCard } from '@/components/search/HitCard'

export const CustomInfiniteHits = () => {
  const { hits, isLastPage, showMore } = useInfiniteHits()
  const sentinelRef = useRef(null)

  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isLastPage) {
            showMore()
          }
        })
      })

      observer.observe(sentinelRef.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [isLastPage, showMore])

  return (
    <div className='ais-InfiniteHits pt-4'>
      <ul className='flex flex-wrap gap-4 max-sm:justify-center'>
        {hits.map(hit => (
          <li key={hit.objectID} className='flex flex-col'>
            <HitCard
              hit={{
                objectID: hit.objectID,
                Product: hit.Product || '',
                SKU: hit.SKU || '',
                Stock: hit.Stock || 0,
                Imagen: hit.Imagen || ''
              }}
            />
          </li>
        ))}
        <li ref={sentinelRef} aria-hidden='true' />
      </ul>
    </div>
  )
}
