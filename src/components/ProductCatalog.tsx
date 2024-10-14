'use client'

import { useRef, useEffect, useState } from 'react'
import {
  InstantSearch,
  Configure,
  useInfiniteHits,
  useSearchBox,
  Hits
} from 'react-instantsearch'
import { algoliasearch } from 'algoliasearch'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useProducts } from '@/hooks/useProducts'
import imgNotFound from '@/assets/not found.png'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME

const searchClient = algoliasearch(appId ?? '', searchKey ?? '')

interface HitCardProps {
  hit: {
    objectID: string
    Product: string
    SKU: string
    Stock: number
    Imagen: string
  }
}

const HitCard = ({ hit }: HitCardProps) => {
  const { addProduct } = useProducts()
  const [quantity, setQuantity] = useState(1)

  return (
    <Card key={hit.objectID} className='w-[290px]'>
      <CardHeader>
        <Image
          src={hit.Imagen || imgNotFound}
          alt={`Imagen referencial del producto ${hit.Product}`}
          width={200}
          height={200}
        />
        <CardTitle className='text-base lowercase'>{hit.Product}</CardTitle>
        <CardDescription>SKU: {hit.SKU}</CardDescription>
      </CardHeader>
      <CardContent className='border-t pt-4'>
        <p className='text-sm'>Stock disponible: {hit.Stock} und.</p>
      </CardContent>
      <CardFooter className='flex justify-between gap-4'>
        <Input
          type='number'
          placeholder='1'
          className='max-w-[80px]'
          value={quantity}
          onChange={e => setQuantity(Number(e.currentTarget.value))}
          min={1}
        />
        <Button onClick={() => addProduct({ ...hit, quantity: 0 }, quantity)}>
          Añadir a REM
        </Button>
      </CardFooter>
    </Card>
  )
}

const CustomInfiniteHits = () => {
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

const SearchSuggestions = ({
  onSuggestionClick,
  setShowSuggestions
}: {
  onSuggestionClick: (query: string) => void
  setShowSuggestions: (value: boolean) => void
}) => {
  return (
    <div className='absolute search-suggestions bg-white border border-gray-300 mt-2 rounded-lg shadow-lg'>
      <Hits
        hitComponent={({ hit }: HitCardProps) => (
          <SuggestionItem
            hit={hit}
            onClick={onSuggestionClick}
            setShowSuggestions={setShowSuggestions}
          />
        )}
      />
    </div>
  )
}

type SuggestionItemProps = {
  hit: { Product: string }
  onClick: (product: string) => void
  setShowSuggestions: (value: boolean) => void
}

const SuggestionItem = ({
  hit,
  onClick,
  setShowSuggestions
}: SuggestionItemProps) => (
  <div
    className='suggestion-item lowercase p-2 hover:bg-gray-100 cursor-pointer'
    onClick={() => {
      onClick(hit.Product)
      setShowSuggestions(false)
    }}
  >
    <span>{hit.Product}</span>
  </div>
)

const SearchBar = () => {
  const { query, refine } = useSearchBox()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchBoxRef = useRef(null)

  const handleSuggestionClick = (suggestion: string) => {
    refine(suggestion)
    setShowSuggestions(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !(searchBoxRef.current as Node).contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchBoxRef])

  return (
    <div className='relative' ref={searchBoxRef}>
      <Input
        id='customSearchAlgolia'
        type='search'
        value={query}
        onChange={e => {
          refine(e.currentTarget.value)
          setShowSuggestions(true)
        }}
        placeholder='Buscar producto por nombre o SKU'
        autoComplete='off'
        className='lowercase'
      />
      {query && showSuggestions && (
        <SearchSuggestions
          onSuggestionClick={handleSuggestionClick}
          setShowSuggestions={setShowSuggestions}
        />
      )}
    </div>
  )
}

export const ProductCatalog = () => {
  return (
    <section className='mb-6'>
      <InstantSearch
        indexName={indexName}
        searchClient={searchClient}
        future={{
          preserveSharedStateOnUnmount: true
        }}
      >
        <div className='mb-10 flex flex-wrap gap-6 lg:gap-10 xl:gap-20'>
          <div className='w-full max-w-xl'>
            <SearchBar />
          </div>
        </div>
        <Configure />
        <CustomInfiniteHits />
      </InstantSearch>
    </section>
  )
}
